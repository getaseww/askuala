import { Application } from "express";
import UserRoutes from './User.routes';
import AboutRoutes from './About.routes'
import EducationRoutes from './Eduaction.routes'
import ProfileRoutes from './Profile.routes'
import PaymentRoutes from './Payment.routes'
import Reviewroutes from './Review.routes'



let routes=(app:Application)=>{
    app.use('/api/user',UserRoutes);
    app.use('/api/about',AboutRoutes);
    app.use('/api/education',EducationRoutes);
    app.use('/api/profile',ProfileRoutes);
    app.use('/api/payment',PaymentRoutes);
    app.use('/api/review',Reviewroutes);
}

export default routes;