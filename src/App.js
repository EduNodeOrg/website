import React, { useState, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "./store";
import './App.css';
import { CookieConsentProvider } from "./hooks/useCookieConsent";
import CookieBanner from "./components/CookieConsent/Banner";
import ConsentScripts from "./components/CookieConsent/ConsentScripts";
import Home from "./components/Home";

// Route components are lazy-loaded so the main bundle only ships the
// landing page — everything else loads on demand per route.
const AboutUs = lazy(() => import("./components/aboutus"));
const Node = lazy(() => import("./components/StellarNodes"));
const Account = lazy(() => import("./components/Account"));
const Resources = lazy(() => import("./components/Resources"));
const Community = lazy(() => import("./components/Community"));
const Project = lazy(() => import("./components/Community/project"));
const Milestones = lazy(() => import("./components/Milestones"));
const TermsAndConditions = lazy(() => import("./components/Terms"));

const Courses = lazy(() => import('./components/Courses'));
const Questions1 = lazy(() => import('./components/Courses1/Questions'));
const Questions = lazy(() => import('./components/Courses/Questions'));
const QuestionsTwo = lazy(() => import('./components/Courses/QuestionsTwo'));
const QuestionsTwo1 = lazy(() => import('./components/Courses1/QuestionsTwo'));
const QuestionsThree = lazy(() => import('./components/Courses/QuestionsThree'));
const QuestionsThree1 = lazy(() => import('./components/Courses1/QuestionsThree'));
const QuestionsFour = lazy(() => import('./components/Courses/QuestionsFour'));
const QuestionsFive = lazy(() => import('./components/Courses/QuestionsFive'));
const QuestionsFour1 = lazy(() => import('./components/Courses1/QuestionsFour'));
const QuestionsFive1 = lazy(() => import('./components/Courses1/QuestionsFive'));
const QuestionsSix1 = lazy(() => import('./components/Courses1/QuestionsSix'));
const Questions2 = lazy(() => import('./components/Courses2/Questions'));
const QuestionsTwo2 = lazy(() => import('./components/Courses2/QuestionsTwo'));
const QuestionsThree2 = lazy(() => import('./components/Courses2/QuestionsThree'));
const QuestionsFour2 = lazy(() => import('./components/Courses2/QuestionsFour'));
const QuestionsFive2 = lazy(() => import('./components/Courses2/QuestionsFive'));
const Questions3 = lazy(() => import('./components/Courses3/Questions'));
const QuestionsTwo3 = lazy(() => import('./components/Courses3/QuestionsTwo'));
const QuestionsThree3 = lazy(() => import('./components/Courses3/QuestionsThree'));
const QuestionsFour3 = lazy(() => import('./components/Courses3/QuestionsFour'));
const QuestionsFive3 = lazy(() => import('./components/Courses3/QuestionsFive'));
const Questions4 = lazy(() => import('./components/Courses4/Questions'));
const QuestionsTwo4 = lazy(() => import('./components/Courses4/QuestionsTwo'));
const QuestionsThree4 = lazy(() => import('./components/Courses4/QuestionsThree'));
const QuestionsFour4 = lazy(() => import('./components/Courses4/QuestionsFour'));
const QuestionsFive4 = lazy(() => import('./components/Courses4/QuestionsFive'));
const Questions5 = lazy(() => import('./components/Courses5/Questions'));
const QuestionsTwo5 = lazy(() => import('./components/Courses5/QuestionsTwo'));
const QuestionsThree5 = lazy(() => import('./components/Courses5/QuestionsThree'));
const QuestionsFour5 = lazy(() => import('./components/Courses5/QuestionsFour'));
const QuestionsFive5 = lazy(() => import('./components/Courses5/QuestionsFive'));
const Questions6 = lazy(() => import('./components/Courses6/Questions'));
const QuestionsTwo6 = lazy(() => import('./components/Courses6/QuestionsTwo'));
const QuestionsThree6 = lazy(() => import('./components/Courses6/QuestionsThree'));
const QuestionsFour6 = lazy(() => import('./components/Courses6/QuestionsFour'));
const QuestionsFive6 = lazy(() => import('./components/Courses6/QuestionsFive'));
const Questions7 = lazy(() => import('./components/Courses7/Questions'));
const QuestionsTwo7 = lazy(() => import('./components/Courses7/QuestionsTwo'));
const QuestionsThree7 = lazy(() => import('./components/Courses7/QuestionsThree'));
const QuestionsFour7 = lazy(() => import('./components/Courses7/QuestionsFour'));
const QuestionsFive7 = lazy(() => import('./components/Courses7/QuestionsFive'));
const Questions8 = lazy(() => import('./components/Courses8/Questions'));
const QuestionsTwo8 = lazy(() => import('./components/Courses8/QuestionsTwo'));
const QuestionsThree8 = lazy(() => import('./components/Courses8/QuestionsThree'));
const QuestionsFour8 = lazy(() => import('./components/Courses8/QuestionsFour'));
const QuestionsFive8 = lazy(() => import('./components/Courses8/QuestionsFive'));
const Questions9 = lazy(() => import('./components/Courses9/Questions'));
const QuestionsTwo9 = lazy(() => import('./components/Courses9/QuestionsTwo'));
const QuestionsThree9 = lazy(() => import('./components/Courses9/QuestionsThree'));
const QuestionsFour9 = lazy(() => import('./components/Courses9/QuestionsFour'));
const QuestionsFive9 = lazy(() => import('./components/Courses9/QuestionsFive'));

const Questions10 = lazy(() => import('./components/Courses10/Questions'));
const QuestionsTwo10 = lazy(() => import('./components/Courses10/QuestionsTwo'));
const QuestionsThree10 = lazy(() => import('./components/Courses10/QuestionsThree'));
const QuestionsFour10 = lazy(() => import('./components/Courses10/QuestionsFour'));
const QuestionsFive10 = lazy(() => import('./components/Courses10/QuestionsFive'));

const Intro = lazy(() => import('./components/Courses/One/Intro'));
const Intro1 = lazy(() => import('./components/Courses1/One/Intro'));
const Intro2 = lazy(() => import('./components/Courses2/One/Intro'));
const Intro3 = lazy(() => import('./components/Courses3/One/Intro'));
const Intro4 = lazy(() => import('./components/Courses4/One/Intro'));
const Intro5 = lazy(() => import('./components/Courses5/One/Intro'));
const Intro6 = lazy(() => import('./components/Courses6/One/Intro'));
const Intro7 = lazy(() => import('./components/Courses7/One/Intro'));
const Intro8 = lazy(() => import('./components/Courses8/One/Intro'));
const Intro9 = lazy(() => import('./components/Courses9/One/Intro'));
const Intro10 = lazy(() => import('./components/Courses10/One/Intro'));

const ProCourseLanding = lazy(() => import('./components/ProCourses/ProCourseLanding'));
const ProCourseModule = lazy(() => import('./components/ProCourses/ProCourseModule'));
const ProCourseDone = lazy(() => import('./components/ProCourses/ProCourseDone'));

const Coursedone = lazy(() => import("./components/Courses/Coursedone"));
const Coursedone1 = lazy(() => import("./components/Courses1/Coursedone"));
const Coursedone2 = lazy(() => import("./components/Courses2/Coursedone"));
const Coursedone3 = lazy(() => import("./components/Courses3/Coursedone"));
const Coursedone4 = lazy(() => import("./components/Courses4/Coursedone"));
const Coursedone5 = lazy(() => import("./components/Courses5/Coursedone"));
const Coursedone6 = lazy(() => import("./components/Courses6/Coursedone"));
const Coursedone7 = lazy(() => import("./components/Courses7/Coursedone"));
const Coursedone8 = lazy(() => import("./components/Courses8/Coursedone"));
const Coursedone9 = lazy(() => import("./components/Courses9/Coursedone"));
const Coursedone10 = lazy(() => import("./components/Courses10/Coursedone"));

const Challengedone = lazy(() => import("./components/Challenges/Challenge/Coursedone"));
const Keybase = lazy(() => import("./components/Blog/Articles/Keybase"));
const Issue = lazy(() => import("./components/Blog/Articles/Issue"));
// Register component is now accessed via /signup route (Signup alias below)
const Login = lazy(() => import("./components/Login"));
const Pref = lazy(() => import("./components/Dashboard/preferences"));
const Chat = lazy(() => import("./components/Chat"));
const History = lazy(() => import("./components/Chat/history"));
const Blog = lazy(() => import("./components/Blog"));
const VerifyEmail = lazy(() => import("./components/VerifyEmail"));
const Stellarnomics = lazy(() => import("./components/Blog/Articles/Stellarnomics"));
const Projects = lazy(() => import("./components/Projects"));
const Seguridad = lazy(() => import("./components/Blog/Articles/Seguridad"));
const Blockchain = lazy(() => import("./components/Blog/Articles/Blockchain"));
const Contracts = lazy(() => import('./components/Blog/Articles/Contracts'));
const Docker = lazy(() => import('./components/Blog/Articles/Docker'));
const Ipfs = lazy(() => import('./components/Blog/Articles/Ipfs'));
const AMM = lazy(() => import('./components/Blog/Articles/AMM/AMM'));
const Kelp = lazy(() => import("./components/Blog/Articles/Kelp"));
const PostgreSQL = lazy(() => import("./components/Blog/Articles/Postgresql"));
const Albedo = lazy(() => import("./components/Blog/Articles/Albedo"));
const Security = lazy(() => import('./components/Blog/Articles/Security'));
const NFT = lazy(() => import('./components/Blog/Articles/NFT'));
const Certificate = lazy(() => import("./components/Certificate"));
const Web3 = lazy(() => import("./components/Blog/Articles/Web3"));
const ZKP = lazy(() => import("./components/Blog/Articles/ZKP"));
const Roadmap = lazy(() => import("./components/Blog/Articles/Roadmap"));
const Stablecoin = lazy(() => import("./components/Blog/Articles/Stablecoin"));
const RWA = lazy(() => import("./components/Blog/Articles/RWA"));
const ContractSecurity = lazy(() => import("./components/Blog/Articles/ContractSecurity"));
const Freighter = lazy(() => import("./components/Blog/Articles/Freighter"));
const ChainChess = lazy(() => import("./components/Chess/"));
const Feed = lazy(() => import("./components/Feed"));
const Gcallback = lazy(() => import("./components/Gcallback"));
const Hyperledger = lazy(() => import("./components/Hyperledger"));
const HyperledgerCourses = lazy(() => import("./components/Hyperledger/Courses"));
const Challenge = lazy(() => import("./components/Challenges/Challenge"));
const ChallengeGame = lazy(() => import("./components/Challenges/gameChallenge"));
const ChallengeGameQ = lazy(() => import("./components/Challenges/gameChallenge/Intro"));
const ChallengeGame2Q = lazy(() => import("./components/Challenges/gameChallenge/Chalenge2intro"));
const LeaderBoard = lazy(() => import("./components/Challenges/gameChallenge/leaderBoard"));
const ChallengeQ = lazy(() => import('./components/Challenges/Challenge/One/Intro.js'));
const CodeEditor = lazy(() => import("./components/CodeEditor"));
const ContactUs = lazy(() => import("./components/contactus"));
const Loggedout = lazy(() => import("./components/Loggedout"));
const Membership = lazy(() => import("./components/Membership"));
const NewPost = lazy(() => import("./components/NewPost"));
const Privacy = lazy(() => import('./components/Privacy'));
const SubmitPost = lazy(() => import("./components/SubmitPost"));
const Dashboard = lazy(() => import("./components/Dashboard"));
//import Main from "./components/Dashboard/Main";
const Post = lazy(() => import("./components/Posts/Post"));
const Cours = lazy(() => import("./components/Teach/teach"));
const Tutor = lazy(() => import("./components/Teach/teachRole"));
const Badge = lazy(() => import("./components/Teach/badge"));
const ValidCertificate = lazy(() => import("./components/Teach/validCertificate"));
const Certificat = lazy(() => import("./components/Certificate/certificat"));
const Notification = lazy(() => import('./components/Notifications/Notification'));
const Achievement = lazy(() => import('./components/Achievment/Achievment'));
const Search = lazy(() => import("./components/Search/Search"));
const Sep = lazy(() => import('./components/Sep/sep'));
const AiPlugin = lazy(() => import('./components/AiPlugin'));
const PostDetails = lazy(() => import('./components/Posts/postDetails'));
const CourseDetails = lazy(() => import('./components/Courses/courseDetails'));
const Loginn = lazy(() => import('./components/Login'));
const Signup = lazy(() => import("./components/Register"));
const Glossary = lazy(() => import("./components/Glossary"));
const Badges = lazy(() => import('./components/Badges'));
const EduNodeGuide = lazy(() => import('./components/teacher'));
const StudentsPage = lazy(() => import("./components/student"));
const PasswordPage = lazy(() => import('./components/Login/password'));
const ResetPasswordPage = lazy(() => import('./components/Login/reset_password'));
const ModernProfile = lazy(() => import('./components/Profile/ModernProfile'));
const ModernMyProfile = lazy(() => import('./components/Profile/ModernMyProfile'));
const CertificatePage = lazy(() => import('./components/Certificate/about'));
const ChallengeDetails = lazy(() => import('./components/Challenges/Challenge/challengeDetails'));
const ThemeProvider = lazy(() => import('./admin/src/theme'));
const DashboardLayout = lazy(() => import('./admin/src/layouts/dashboard'));
const DashboardAdmin = lazy(() => import('./admin/src/layouts/adminDashboard'));
const BlogPage = lazy(() => import('./admin/src/pages/BlogPage'));
const UserPage = lazy(() => import('./admin/src/pages/UserPage'));
const AddedBadges = lazy(() => import('./admin/src/pages/Badges'));
const AddedCourses = lazy(() => import('./admin/src/pages/Courses'));
const Users = lazy(() => import('./admin/src/pages/Users'));
const Glossaires = lazy(() => import('./admin/src/pages/Glossaires'));
const UserAdmin = lazy(() => import('./admin/src/pages/UserAdmin'));
const LoginPage = lazy(() => import('./admin/src/pages/LoginPage'));
const ProductsPage = lazy(() => import('./admin/src/pages/ProductsPage'));
const DashboardAppPage = lazy(() => import('./admin/src/pages/DashboardAppPage'));
const DashboardAppAdmin = lazy(() => import('./admin/src/pages/DashboardAdmin'));
const Messages = lazy(() => import('./components/Profile/messages'));
const Game = lazy(() => import('./components/Challenges/gameChallenge/addGame'));
const Pricing = lazy(() => import('./components/Membership/Pricing'));
const StripeCheckout = lazy(() => import('./components/Membership/StripeCheckout'));
const Releases = lazy(() => import('./components/Releases'));
const Soroban = lazy(() => import('./components/Blog/Articles/Soroban'));
const Page404 = lazy(() => import('./admin/src/pages/Page404'));
const CheckoutSuccess = lazy(() => import('./components/Membership/CheckoutSuccess'));
const EmailUnsubscribe = lazy(() => import('./components/EmailUnsubscribe'));

const ThemedRoutes = () => (
  <ThemeProvider>
    <Routes>
     
      <Route path="/AdminDashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/AdminDashboard/app" />} />
        <Route path="app" element={<DashboardAppPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="badges" element={<AddedBadges />} />
        <Route path="courses" element={<AddedCourses />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="blog" element={<BlogPage />} />
      </Route>
      <Route path="/Admin" element={<DashboardAdmin />}>
        <Route index element={<Navigate to="/Admin/app" />} />
        <Route path="users" element={<Users />} />
        <Route path="glossary" element={<Glossaires />} />
        <Route path="app" element={<DashboardAppAdmin />} />
        <Route path="roles" element={<UserAdmin/>} />
      </Route>

      <Route exact path="/Adminlogin" element={<LoginPage />} />
      <Route exact path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </ThemeProvider>
);




function App(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const shouldShowFooter = window.location.pathname !== '/certificates/:certificateNumber';

  
  return (
    <Provider store={store}>
      <CookieConsentProvider>
        <ConsentScripts />
        <CookieBanner />
      <Suspense fallback={<div className="route-loading" />}>
      <Routes location={location} navigate={navigate}>
     
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/pricing" element={<Pricing />} />
        <Route exact path="/stellarnodes" element={<Node />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/resources" element={<Resources />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/preferences" element={<Pref />} />
        <Route exact path="/community/project" element={<Project />} />
        <Route exact path="/milestones" element={<Milestones />} />
        <Route exact path="/courses" element={<Courses />} />
        <Route exact path="/courses/101" element={<Intro />} />
        <Route exact path="/courses/102" element={<Intro1 />} />
        <Route exact path="/courses/103" element={<Intro2 />} />
        <Route exact path="/courses/104" element={<Intro3 />} />
        <Route exact path="/courses/105" element={<Intro4 />} />
        <Route exact path="/courses/106" element={<Intro5 />} />
        <Route exact path="/courses/107" element={<Intro6 />} />
        <Route exact path="/courses/108" element={<Intro7 />} />
        <Route exact path="/courses/109" element={<Intro8 />} />
        <Route exact path="/courses/110" element={<Intro9 />} />
        <Route exact path="/courses/111" element={<Intro10 />} />  


        <Route exact path="/courses/101/1" element={<Questions />} />
        <Route exact path="/courses/101/2" element={<QuestionsTwo />} />
        <Route exact path="/courses/101/3" element={<QuestionsThree />} />
        <Route exact path="/courses/101/4" element={<QuestionsFour />} />
        <Route exact path="/courses/101/5" element={<QuestionsFive />} />
        <Route exact path="/courses/101/done" element={<Coursedone />} />

        <Route exact path="/courses/102/1" element={<Questions1 />} />
        <Route exact path="/courses/102/2" element={<QuestionsTwo1 />} />
        <Route exact path="/courses/102/3" element={<QuestionsThree1 />} />
        <Route exact path="/courses/102/4" element={<QuestionsFour1 />} />
        <Route exact path="/courses/102/5" element={<QuestionsFive1 />} />
        <Route exact path="/courses/102/6" element={<QuestionsSix1 />} />
        <Route exact path="/courses/102/done" element={<Coursedone1 />} />

        <Route exact path="/courses/103/1" element={<Questions2 />} />
        <Route exact path="/courses/103/2" element={<QuestionsTwo2 />} />
        <Route exact path="/courses/103/3" element={<QuestionsThree2 />} />
        <Route exact path="/courses/103/4" element={<QuestionsFour2 />} />
        <Route exact path="/courses/103/5" element={<QuestionsFive2 />} />
        <Route exact path="/courses/103/done" element={<Coursedone2 />} />

        <Route exact path="/courses/104/1" element={<Questions3 />} />
        <Route exact path="/courses/104/2" element={<QuestionsTwo3 />} />
        <Route exact path="/courses/104/3" element={<QuestionsThree3 />} />
        <Route exact path="/courses/104/4" element={<QuestionsFour3 />} />
        <Route exact path="/courses/104/5" element={<QuestionsFive3 />} />
        <Route exact path="/courses/104/done" element={<Coursedone3 />} />
        <Route exact path="/courses/105/1" element={<Questions4 />} />
        <Route exact path="/courses/105/2" element={<QuestionsTwo4 />} />
        <Route exact path="/courses/105/3" element={<QuestionsThree4 />} />
        <Route exact path="/courses/105/4" element={<QuestionsFour4 />} />
        <Route exact path="/courses/105/5" element={<QuestionsFive4 />} />
        <Route exact path="/courses/105/done" element={<Coursedone4 />} />
        <Route exact path="/courses/106/1" element={<Questions5 />} />
        <Route exact path="/courses/106/2" element={<QuestionsTwo5 />} />
        <Route exact path="/courses/106/3" element={<QuestionsThree5 />} />
        <Route exact path="/courses/106/4" element={<QuestionsFour5 />} />
        <Route exact path="/courses/106/5" element={<QuestionsFive5 />} />
        <Route exact path="/courses/106/done" element={<Coursedone5 />} />
        <Route exact path="/courses/107/1" element={<Questions6 />} />
        <Route exact path="/courses/107/2" element={<QuestionsTwo6 />} />
        <Route exact path="/courses/107/3" element={<QuestionsThree6 />} />
        <Route exact path="/courses/107/4" element={<QuestionsFour6 />} />
        <Route exact path="/courses/107/5" element={<QuestionsFive6 />} />
        <Route exact path="/courses/107/done" element={<Coursedone6 />} />
        <Route exact path="/courses/108/1" element={<Questions7 />} />
        <Route exact path="/courses/108/2" element={<QuestionsTwo7 />} />
        <Route exact path="/courses/108/3" element={<QuestionsThree7 />} />
        <Route exact path="/courses/108/4" element={<QuestionsFour7 />} />
        <Route exact path="/courses/108/5" element={<QuestionsFive7 />} />
        <Route exact path="/courses/108/done" element={<Coursedone7 />} />
        <Route exact path="/courses/109/1" element={<Questions8 />} />
        <Route exact path="/courses/109/2" element={<QuestionsTwo8 />} />
        <Route exact path="/courses/109/3" element={<QuestionsThree8 />} />
        <Route exact path="/courses/109/4" element={<QuestionsFour8 />} />
        <Route exact path="/courses/109/5" element={<QuestionsFive8 />} />
        <Route exact path="/courses/109/done" element={<Coursedone8 />} />

        <Route exact path="/courses/110/1" element={<Questions9 />} />
        <Route exact path="/courses/110/2" element={<QuestionsTwo9 />} />
        <Route exact path="/courses/110/3" element={<QuestionsThree9 />} />
        <Route exact path="/courses/110/4" element={<QuestionsFour9 />} />
        <Route exact path="/courses/110/5" element={<QuestionsFive9 />} />
        <Route exact path="/courses/110/done" element={<Coursedone9 />} />

        <Route exact path="/courses/111/1" element={<Questions10 />} />
        <Route exact path="/courses/111/2" element={<QuestionsTwo10 />} />
        <Route exact path="/courses/111/3" element={<QuestionsThree10 />} />
        <Route exact path="/courses/111/4" element={<QuestionsFour10 />} />
        <Route exact path="/courses/111/5" element={<QuestionsFive10 />} />
        <Route exact path="/courses/111/done" element={<Coursedone10 />} />

        <Route exact path="/courses/112" element={<ProCourseLanding courseId="112" />} />
        <Route exact path="/courses/112/done" element={<ProCourseDone courseId="112" />} />
        <Route exact path="/courses/112/:step" element={<ProCourseModule courseId="112" />} />

        <Route exact path="/courses/113" element={<ProCourseLanding courseId="113" />} />
        <Route exact path="/courses/113/done" element={<ProCourseDone courseId="113" />} />
        <Route exact path="/courses/113/:step" element={<ProCourseModule courseId="113" />} />

        <Route exact path="/courses/114" element={<ProCourseLanding courseId="114" />} />
        <Route exact path="/courses/114/done" element={<ProCourseDone courseId="114" />} />
        <Route exact path="/courses/114/:step" element={<ProCourseModule courseId="114" />} />

        <Route exact path="/courses/115" element={<ProCourseLanding courseId="115" />} />
        <Route exact path="/courses/115/done" element={<ProCourseDone courseId="115" />} />
        <Route exact path="/courses/115/:step" element={<ProCourseModule courseId="115" />} />

        <Route exact path="/courses/116" element={<ProCourseLanding courseId="116" />} />
        <Route exact path="/courses/116/done" element={<ProCourseDone courseId="116" />} />
        <Route exact path="/courses/116/:step" element={<ProCourseModule courseId="116" />} />

        <Route exact path="/courses/117" element={<ProCourseLanding courseId="117" />} />
        <Route exact path="/courses/117/done" element={<ProCourseDone courseId="117" />} />
        <Route exact path="/courses/117/:step" element={<ProCourseModule courseId="117" />} />


        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/blog/What-is-Keybase" element={<Keybase />} />
        <Route exact path="/blog/How-to-issue" element={<Issue />} />
        <Route exact path="/register" element={<Navigate to="/signup" replace />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/certificate" element={<Certificate />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/blog/Stellarnomics" element={<Stellarnomics />} />
        <Route exact path="/blog/minting-nfts" element={<NFT />} />
        <Route exact path="/blog/security-tools" element={<Security />} />
        <Route exact path="/blog/herramientas-de-seguridad" element={<Seguridad />} />
        <Route exact path="/blog/smart-contracts" element={<Contracts />} />
        <Route exact path="/blog/kelp" element={<Kelp />} />
        <Route exact path="/blog/postgresql" element={<PostgreSQL />} />

        <Route exact path="/blog/the-web3-revolution" element={<Web3 />} />
        <Route exact path="/blog/zero-knowledge-proofs" element={<ZKP />} />
        <Route exact path="/blog/albedo" element={<Albedo />} />
        <Route exact path="/blog/automated-market-maker" element={<AMM />} />
        <Route exact path="/blog/learn-about-blockchain" element={<Blockchain />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/chess" element={<ChainChess />} />
        <Route exact path="/releases" element={<Releases />} />
        <Route exact path="/feed" element={<Feed />} />
        <Route exact path="/gcallback" element={<Gcallback />} />
        <Route exact path="/hyperledger" element={<Hyperledger />} />
        <Route exact path="/hyperledger/courses" element={<HyperledgerCourses />} />
        <Route exact path="/challenges" element={<Challenge />} />
        <Route exact path="/challengeGame" element={<ChallengeGame />} />
        <Route exact path="/challengeGame/leaderBoard" element={<LeaderBoard/>} />
        <Route exact path="/codeeditor" element={<CodeEditor />} />
        <Route exact path="/contactus" element={<ContactUs />} />
        <Route exact path="/loggedout" element={<Loggedout />} />
        <Route exact path="/membership" element={<Membership />} />
        <Route exact path="/membership/checkout" element={<StripeCheckout />} />
        <Route exact path="/membership/success" element={<CheckoutSuccess />} />
        <Route exact path="/dashboard/newpost" element={<NewPost />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route exact path="/submitpost" element={<SubmitPost />} />
        <Route exact path="/VerifyEmail" element={<VerifyEmail />} />
        <Route exact path="/blog/docker" element={<Docker />} />
        <Route exact path="/blog/ipfs" element={<Ipfs />} />
        <Route exact path="/blog/soroban" element={<Soroban />} />
        <Route exact path="/blog/blockchain-developer-roadmap" element={<Roadmap />} />
        <Route exact path="/blog/what-is-a-stablecoin" element={<Stablecoin />} />
        <Route exact path="/blog/rwa-tokenization" element={<RWA />} />
        <Route exact path="/blog/smart-contract-security-vulnerabilities" element={<ContractSecurity />} />
        <Route exact path="/blog/freighter-wallet" element={<Freighter />} />
        <Route exact path="/dashboard/settings" element={<Navigate to="/account" replace />} />
        <Route exact path="/profile" element={<ModernMyProfile />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/notification" element={<Notification />} />
        <Route exact path="/achievement" element={<Achievement />} />
        <Route exact path="/Course" element={<Cours />} />
        <Route exact path="/tutor" element={<Tutor />} />
        <Route exact path="/terms" element={<TermsAndConditions />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/certificates/:certificateNumber" element={<Certificat />} />
        <Route exact path="/historyChat" element={<History />} />
        <Route exact path="/.well-known/stellar.toml" element={<Sep />} />
        <Route exact path="/.well-known/ai-plugin.json" element={<AiPlugin />} />
        <Route exact path="/postDetails/:_id" element={<PostDetails />} />
        <Route exact path="/courseDetails/:_id" element={<CourseDetails />} />
        <Route exact path="/profile/:id" element={<ModernProfile />} />
        <Route exact path="/validCertificate" element={<ValidCertificate />} />
        <Route exact path="/messages" element={<Messages />} />
        <Route exact path="/addGame" element={<Game />} />
        <Route
          exact
          path="/loginn"
          element={user ? <Navigate to="/" /> : <Loginn />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route exact path="/glossary" element={<Glossary />} />
        <Route exact path="/Badges" element={<Badges />} />
        <Route exact path="/addBadge" element={<Badge />} />
        <Route exact path="/challenges/101" element={<ChallengeQ />} />
        <Route exact path="/challengeGame1/:randomNumber" element={<ChallengeGameQ />} />
        <Route exact path="/challengeGame2/:randomNumber" element={<ChallengeGame2Q />} />
        <Route exact path="/challenges/101/done" element={<Challengedone />} />
        <Route exact path="/for-teachers" element={<EduNodeGuide />} />
        <Route exact path="/for-students" element={<StudentsPage />} />
        <Route exact path="/forgot_password" element={<PasswordPage />} />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/about-certificates" element={<CertificatePage />} />
        <Route exact path="/challengeDetails/:_id" element={<ChallengeDetails />} />
        <Route exact path="/unsubscribe" element={<EmailUnsubscribe />} />
        <Route path="/*" element={<ThemedRoutes />} />
      </Routes>
      </Suspense>
      </CookieConsentProvider>
    </Provider>

  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps)(App);