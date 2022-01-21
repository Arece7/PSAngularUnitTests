import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('heroesComponent (shallow test)',()=>{
    //fixture is a wrapper around component
    let fixture:ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockHeroService;

    //creating fake child component
    @Component({
        selector: 'app-hero',
        template: '<div></div>'
      })
    class fakeHeroComponent {
        @Input() hero: Hero;
        //@Output() delete = new EventEmitter();
    }

    beforeEach(()=>{
        //mock data of heroes
        HEROES = [
            {id:1,name:'superDude',strength:8},
            {id:2,name:'wonder Woman',strength:55},
            {id:3,name:'spiderMan',strength:57}
         ];
        //mocking associated sevice with the help of jasmine
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        //creating unit testing module with help of testbed (same as original module)
        TestBed.configureTestingModule ({
            declarations:[
                HeroesComponent,
                fakeHeroComponent
            ],
            providers:[
                //using long hand syntax because if heroservice called then it will prove mockheroservice
                {provide: HeroService, useValue: mockHeroService} 
            ],
           // schemas:[NO_ERRORS_SCHEMA] (to ignore associated template)
        })
       //creating fixture of component
        fixture = TestBed.createComponent(HeroesComponent);
    })
    it('should set heroes correctly from the service',()=>{
        //it will return observable as we are subscribing HeroService 
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //it will detect binidings in associated template and rum lifecycle hook(ngOnInit)
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should create one li for each hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        //debugElement is wrapper around DOM element
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})