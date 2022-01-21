import { MessageService } from "./message.service"

describe('messageService',() =>{
    let msgService:MessageService;
//it will excute before each test
    beforeEach(()=>{
        msgService = new MessageService(); 
    })

    it('should have no message to start',()=>{
        expect(msgService.messages.length).toBe(0);
    })

    it('should have 1 message',()=>{
        msgService.add('legend');

        expect(msgService.messages.length).toBe(1);
    })
    it('should clear messages when clear method called',()=>{
        msgService.add('all legend');

        msgService.clear();

        expect(msgService.messages.length).toBe(0);
    })
})