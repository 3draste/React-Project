import {render, screen} from "@testing-library/react";
import App from "../App";
import profileReducer, {addPostActionCreator, deleteUserProfile} from "./profile-reducer";



let state = {
    posts: [
        {id: 1, message: 'hi', likesCount: 12},
        {id: 2, message: 'How are you ', likesCount: 11},
    ]
}

test('new post should be added', () => {
    let action = addPostActionCreator("it-kamasutra.com")

    let newState = profileReducer(state,action)
    expect(newState.posts.length).toBe(3);
})
test('message of new post should be correct', () => {
    let action = addPostActionCreator("it-kamasutra.com")

    let newState = profileReducer(state,action)
    expect(newState.posts[2].message).toBe("it-kamasutra.com");
});

test('delete',() => {
    let action = deleteUserProfile(1);

    let newState = profileReducer(state,action)
    expect(newState.posts.length).toBe(2);
})
