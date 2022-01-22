import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service"

describe('HeroService(with httpTestingModule)',()=>{
    let mockMessageservice;
    let httpTestingController: HttpTestingController;
    let heroServiceHandler:HeroService;

    beforeEach(()=>{
        mockMessageservice = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                HeroService,
                {provide:MessageService, useValue:mockMessageservice}
            ]
        })
        //basically accesses the dependency injection registry
        httpTestingController = TestBed.inject(HttpTestingController);
        heroServiceHandler = TestBed.inject(HeroService);
    })

    describe('getHero',()=>{
        it('should call get wth correct Url',()=>{
            //call get hero
            heroServiceHandler.getHero(3).subscribe();

            //test that the url was correct
            const req = httpTestingController.expectOne('api/heroes/3');
            //decides what data to send back when the call is made(because its a GET method)
            req.flush({id:3,name:'SpiderDude',strength:100});
            //verifies only the request we expected & no extra request at all
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        })
        
//we can use inject() from angular testing instead of TestBed.inject()
        // it('should call get wth correct Url',inject(
        //     [HttpTestingController,HeroService],
        //     (httpTestingController: HttpTestingController,heroServiceHandler:HeroService)=>{
        //     //call get hero
        //     heroServiceHandler.getHero(3).subscribe();

        //     //test that the url was correct
        //     const req = httpTestingController.expectOne('api/heroes/3');
        //     //decides what data to send back when the call is made(because its a GET method)
        //     req.flush({id:3,name:'SpiderDude',strength:100});
        //     //verifies only the request we expected & no extra request at all
        //     httpTestingController.verify();
        //     expect(req.request.method).toBe('GET');
        // }))
    })

})