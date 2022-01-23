import { Location } from "@angular/common";
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing"
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component"

describe('hero-detail Component',()=>{
    let mockActivatedRoute,mockLocation,mockHeroservice;
    let fixture: ComponentFixture<HeroDetailComponent>;

    mockHeroservice = jasmine.createSpyObj(['getHero','updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {snapshot:{paramMap:{get:()=>{return '1';}}}}
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations:[HeroDetailComponent],
            providers:
            [
                {provide:ActivatedRoute, useValue:mockActivatedRoute},
                {provide:HeroService, useValue:mockHeroservice},
                {provide:Location, useValue:mockLocation}
    
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroservice.getHero.and.returnValue(of({id:5,name:'Thor',sterngth:440}));
    })
    
    it('should render hero name in h2 tag',()=>{
        fixture.detectChanges();
        const textContent = fixture.nativeElement.querySelector('h2').textContent;

        expect(textContent).toContain('THOR');
    })
    //to handle async calls
    it('should call updateHero when save is called',fakeAsync(()=>{
        mockHeroservice.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        //tick(250); use to fast forward the time by 250ms
        flush(); //excute all pending task by fast-forwarding the time when don't know how long we have to wait

        expect(mockHeroservice.updateHero).toHaveBeenCalled();
    }))

     //to handle promise specificly(fakeasync is a better option)
    //  it('should call updateHero when save is called',waitForAsync(()=>{
    //     mockHeroservice.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
         
    //     fixture.whenStable().then(()=>{
    //     expect(mockHeroservice.updateHero).toHaveBeenCalled();
    //  })
    // }))
})