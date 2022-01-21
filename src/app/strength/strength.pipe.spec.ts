import { StrengthPipe } from "./strength.pipe"

describe('strengthPipe',()=>{
    it('should display weak if strength is 5',() => {
        //arrange
        let pipe = new StrengthPipe();
        //act
        let val = pipe.transform(5);
        //assert
        expect(val).toEqual('5 (weak)');
    })

    it('should display strong if strength is 15',() =>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(15)).toEqual('15 (strong)')
    })

    it('should display strong if strength is 15',() =>{
        let pipe = new StrengthPipe();

        expect(pipe.transform(25)).toEqual('25 (unbelievable)')
    })
})