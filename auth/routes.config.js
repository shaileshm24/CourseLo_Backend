import {signup,getUser,login,getEmployees} from '../auth/token'

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

    app.get('/employees',
    getEmployees,
);
};