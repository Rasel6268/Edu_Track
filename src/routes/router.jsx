import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Settings from "../pages/Settings";
import ScheduleTracker from "../pages/dashboard/student/ScheduleTracker";
import AttendancePage from "../pages/dashboard/student/AttendancePage";
import AIStudyPlanner from "../pages/dashboard/student/AIStudyPlanner";
import BudgetTracker from "../pages/dashboard/student/BudgetTracker";
import GroupStudy from "../pages/dashboard/student/GroupStudy";
import PrivateRoute from "./PrivateRoute";
import StudentProfile from "../pages/dashboard/student/StudentProfile";

export const routers = createBrowserRouter([
    {
        path:'/',
        element: <MainLayouts></MainLayouts>,
        children:[
            {
                index: true,
                element: <Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                index:true,
                element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>
            },
            {
                path:'/dashboard/setting',
                element: <Settings></Settings>
            },
            {
                path:'/dashboard/schedule',
                element: <PrivateRoute><ScheduleTracker></ScheduleTracker></PrivateRoute>
            },
            {
                path:"/dashboard/attendance",
                element: <PrivateRoute><AttendancePage></AttendancePage></PrivateRoute>
            },
            {
                path:"/dashboard/ai-planner",
                element: <PrivateRoute><AIStudyPlanner></AIStudyPlanner></PrivateRoute>
            },
            {
                path:'/dashboard/budgets',
                element: <PrivateRoute><BudgetTracker></BudgetTracker></PrivateRoute>
            },
            {
                path:'/dashboard/group',
                element: <GroupStudy></GroupStudy>
            },
            {
                path:'/dashboard/profile',
                element: <StudentProfile></StudentProfile>
            }
        ]
    }
])