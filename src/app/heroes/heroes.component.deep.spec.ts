import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

@Directive({
    selector:'[routerLink]',
    host:{'(click)': 'onClick()'}

})
export class RouterLinkDirectiveStub{
    //will set the value of routerLink attribute
    @Input('routerLink') linkParams:any;
    navigatedTo:any =null;

    onClick(){
        this.navigatedTo =this.linkParams;
    }
}

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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers:[
                //using long hand syntax because if heroservice called then it will prove mockheroservice
                {provide: HeroService, useValue: mockHeroService} 
            ],
            //schemas:[NO_ERRORS_SCHEMA] //(to ignore associated template)
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
    });

//trigger events on elements (option 1)
    // it(`should call heroesComponent(parent) delete method 
    // when heroComponent(child) delete button clicked`,()=>{
    //     spyOn(fixture.componentInstance,'delete')
    //     mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //     fixture.detectChanges();

    //     const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    //     heroComponents[1].query(By.css('button'))
    //     .triggerEventHandler('click',{stopPropagation:()=>{}});

    //     expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);

    // })

//emitting events from children (option 2)
    // it(`should call heroesComponent(parent) delete method 
    // when heroComponent(child) delete button clicked`,()=>{
    //     spyOn(fixture.componentInstance,'delete')
    //     mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //     fixture.detectChanges();

    //     const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    //     (<HeroComponent>heroComponents[1].componentInstance).delete.emit();

    //     expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);

    // })

//raising events on child directive<app-hero> (option 3)
    it(`should call heroesComponent(parent) delete method 
    when heroComponent(child) delete button clicked`,()=>{
        spyOn(fixture.componentInstance,'delete')
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[1].triggerEventHandler('delete',null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);
    })

    it('should add new hero to the hero list when add button is clicked',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name ="Thor";
        mockHeroService.addHero.and.returnValue(of({id:5, name: name, strength:440}));
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputEl.value = name;
        addButton.triggerEventHandler('click',null);
        fixture.detectChanges();
        
        const textContentDE = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(textContentDE).toContain(name);
    })

    it('should have correct routerLink for the first hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click',null);

        expect(routerLink.navigatedTo).toBe('/detail/1');

    })

 
})