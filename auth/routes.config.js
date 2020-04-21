import {signup,getUser,login} from '../auth/token'

export const routeConfig =(app) =>{
    app.post('/signup',
        signup,
    );

    app.post('/login',
        login,
    );
    
    app.get('/verify',
        getUser,
    );
};