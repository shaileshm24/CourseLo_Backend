import {signup,getUser,login,getEmployees,getCourse,assignCourse} from '../auth/token'

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

    app.post('/courses',
         getCourse,
    );

    app.put('/assign',
        assignCourse,
    );  

    app.get('/employees',
    getEmployees,
);
};