import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe('heroesComponent (deep test)',()=>{
    //fixture is a wrapper around component
    let fixture:ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockHeroService;

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
                HeroComponent
            ],
            providers:[
                //using long hand syntax because if heroservice called then it will prove mockheroservice
                {provide: HeroService, useValue: mockHeroService} 
            ],
            schemas:[NO_ERRORS_SCHEMA] //(to ignore associated template)
        })
       //creating fixture of component
        fixture = TestBed.createComponent(HeroesComponent);
        
       
    })

    it('should render each hero as a hero component',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOnIt
        fixture.detectChanges();

       //HeroComponentDEs is a list of debug elements correspond to nodes that have heroComponet
       const HeroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
       expect(HeroComponentDEs.length).toBe(3); 
       for(let i=0;i<HeroComponentDEs.length;i++)
       {
        expect(HeroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
       }
    })
 
})