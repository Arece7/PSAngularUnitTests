import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('heroesComponent',()=>{
    let heroesComp:HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(()=>{
        HEROES = [
            {id:1,name:'superDude',strength:8},
            {id:2,name:'wonder Woman',strength:55},
            {id:3,name:'spiderMan',strength:57}
        ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    heroesComp = new HeroesComponent(mockHeroService);
    })

    describe('deleteMethod',()=>{
        it('should delete heroes from list',()=>{ 
            mockHeroService.deleteHero.and.returnValue(of(true));
            heroesComp.heroes = HEROES;

            heroesComp.delete(HEROES[2]);

            expect(heroesComp.heroes.length).toBe(2);
        })
    })

})