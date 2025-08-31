import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Settings from "../pages/Settings";
import ScheduleTracker from "../pages/dashboard/ScheduleTracker";
import AttendancePage from "../pages/dashboard/student/AttendancePage";
import AIStudyPlanner from "../pages/dashboard/student/AIStudyPlanner";
import BudgetTracker from "../pages/dashboard/student/BudgetTracker";
import GroupStudy from "../pages/dashboard/student/GroupStudy";

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
        element: <Dashboard></Dashboard>,
        children: [
            {
                index:true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path:'/dashboard/setting',
                element: <Settings></Settings>
            },
            {
                path:'/dashboard/schedule',
                element: <ScheduleTracker></ScheduleTracker>
            },
            {
                path:"/dashboard/attendance",
                element: <AttendancePage></AttendancePage>
            },
            {
                path:"/dashboard/ai-planner",
                element: <AIStudyPlanner></AIStudyPlanner>
            },
            {
                path:'/dashboard/budgets',
                element: <BudgetTracker></BudgetTracker>
            },
            {
                path:'/dashboard/group',
                element: <GroupStudy></GroupStudy>
            }
        ]
    }
])