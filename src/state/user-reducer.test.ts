import { userReducer } from "./user-reducer";

test('user reducer should increment only age', ()=>{
const startState = {age: 20, childCount: 2, name: "Dimych"};

const endState = userReducer(startState, {type:"INCREMENT-AGE"})

expect(endState.age).toBe(21)
expect(endState.childCount).toBe(2)
expect(endState.name).toBe("Dimych")

})
test('user reducer should increment only children count', ()=>{
    const startState = {age: 20, childCount: 2, name: "Dimych"};
    
    const endState = userReducer(startState, {type:"INCREMENT-CHILDREN-COUNT"})
    
    expect(endState.age).toBe(20)
    expect(endState.childCount).toBe(3)
    expect(endState.name).toBe("Dimych")
    
    })

    test('user reducer should change name of user', ()=>{
        const startState = {age: 20, childCount: 2, name: "Dimych"};
        const newName = "Viktor"
        const endState = userReducer(startState, {type:"CHANGE-NAME", newName: newName})
        
    
        expect(endState.name).toBe(newName)
        
        })