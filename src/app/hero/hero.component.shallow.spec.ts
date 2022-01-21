import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { execPath } from "process";
import { HeroComponent } from "./hero.component"

describe('heroComponent (shallow test)',()=>{
    let fixture: ComponentFixture<HeroComponent>;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero',()=>{
        fixture.componentInstance.hero = {id:1, name:'SpiderMan', strength:55};

        expect(fixture.componentInstance.hero.name).toEqual('SpiderMan')
    })

    it('should render the hero name inside anchor tag',()=>{
        fixture.componentInstance.hero = {id:1, name:'SpiderMan', strength:55};
        fixture.detectChanges();
        let debugA = fixture.debugElement.query(By.css('a'));

        expect(debugA.nativeElement.textContent).toContain('SpiderMan')
        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SpiderMan');
    })
})