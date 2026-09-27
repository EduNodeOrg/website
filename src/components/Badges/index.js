import withRouter from '../../withRouter';
import { clearErrors } from "../../actions/errorActions";
import { verifyCode } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import React, { Component } from 'react'
import { reduxForm } from "redux-form";
import { Navigate } from "react-router-dom";
import { updateAccount, saveUsernameAlbedo, pkeyGoogleUser } from "../../actions/authActions";
import Navbar1 from '../Dashboard/Navbar1';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import growth from './growth.png';
import elearn from './elearning.png';
import home from './homework.png';
import strong from './strong.png';
import Container from '@mui/material/Container';
import tuto from './tutorial.png';
import dec from './decision-making.png';
import axios from 'axios';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const PageContainer = styled(Box)(() => ({
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 'bold',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    color: '#e2e8f0',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
}));

const BadgeCard = styled(Card)(() => ({
    maxWidth: 300,
    background: 'rgba(26, 31, 58, 0.7)',
    border: '1px solid rgba(123, 47, 247, 0.3)',
    borderRadius: '12px',
    '& .card-link': { color: '#00d4ff' },
}));


class Badge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "",
            userName: "",
            pkey: this.props.auth && this.props.auth.user && this.props.auth.user.pkey ? this.props.auth.user.pkey : "",
            pubkey: "",
            isLoading: false,
            errors: {},
            coursesTrophy: this.props.auth && this.props.auth.user && this.props.auth.user.CoursesTrophy ? this.props.auth.user.CoursesTrophy : 0,
            postsTrophy: this.props.auth && this.props.auth.user && this.props.auth.user.PostsTrophy ? this.props.auth.user.PostsTrophy : 0,
            addCoursesTrophy: this.props.auth && this.props.auth.user && this.props.auth.user.AddCoursesTrophy ? this.props.auth.user.AddCoursesTrophy : 0,
            challengeTrophy: this.props.auth && this.props.auth.user && this.props.auth.user.ChallengesTrophy ? this.props.auth.user.ChallengesTrophy : 0,
            users: null,
            badges: [],
        }

    }

    componentDidMount() {
        this.fetchUsers();
        this.fetchBadges();
    }

    fetchBadges = async () => {
        const { email } = this.state;
        try {
            const response = await axios.get(`https://edunode.herokuapp.com/api/badge/posted/${email}`);
            this.setState({ badges: response.data });
        } catch (error) {
            console.error('Error fetching badges:', error);
        }
    };
    fetchUsers = async () => {


        const localUser = localStorage.getItem('user');
        const user = JSON.parse(localUser);
        const localEmail = user.email;
        axios.get('https://edunode.herokuapp.com/api/users/user', {
            body: {
                email: localEmail
            }
        })
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }

    render() {
        const {
            isAuthenticated,
            isVerified,
            hasUsername,
            isGranted,

        } = this.props.auth;
        const hasShownPopupChat = localStorage.getItem('shownPopupChat');
        const { badges } = this.state;



        //console.log(this.props.auth.user)
        //console.log(this.props.auth.user.pkey)

        const email = this.props.auth && this.props.auth.user && this.props.auth.user.email ? this.props.auth.user.email : "";
        const { certificateCount, certificates, coursesTrophy, postsTrophy, addCoursesTrophy, challengeTrophy } = this.state;

        if (this.props.auth.user) {
            return (
                <PageContainer>
                    <Navbar1 />
                    <Container maxWidth="lg" sx={{ pt: 6, pb: 6 }}>
                        <PageTitle variant="h4" component="h1">Your Badges</PageTitle>
                        <SectionTitle variant="h6">Earned badges</SectionTitle>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', mb: 5 }}>
                                        {coursesTrophy !== 0 && (
                                            <BadgeCard>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={growth}
                                                        alt="Course badge"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#e2e8f0' }}>
                                                            Course Badge
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                                                            Congratulations! You have finished {coursesTrophy} course(s)!
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </BadgeCard>
                                        )}
                                        {postsTrophy !== 0 && (
                                            <BadgeCard>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={home}
                                                        alt="Course badge"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#e2e8f0' }}>
                                                            Posts Badge
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                                                            Congratulations! You have added {postsTrophy} post(s)!
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </BadgeCard>
                                        )}
                                        {addCoursesTrophy !== 0 && (
                                            <BadgeCard>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={elearn}
                                                        alt="Course badge"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#e2e8f0' }}>
                                                            Add Course Badge
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                                                            Congratulations! You have added {addCoursesTrophy} course(s)!
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </BadgeCard>
                                        )}
                                        {isAuthenticated && isVerified && (
                                            <BadgeCard>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={tuto}
                                                        alt="Course badge"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#e2e8f0' }}>
                                                            Community Badge
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                                                            Congratulations! You are a member of our commumnity!
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </BadgeCard>
                                        )}
                                        {hasShownPopupChat && (
                                            <BadgeCard>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={dec}
                                                        alt="Course badge"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#e2e8f0' }}>
                                                            AI Badge
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                                                            Congratulations! You have an AI Badge!
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </BadgeCard>
                                        )}
                                        {challengeTrophy !== 0 && (
                                            <BadgeCard>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={strong}
                                                        alt="Course badge"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#e2e8f0' }}>
                                                            Challenge Badge
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
                                                            Congratulations! You have finished {challengeTrophy} challenge(s)!
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </BadgeCard>
                                        )}
                        </Box>
                        <SectionTitle variant="h6">Posted badges</SectionTitle>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                            {badges.length === 0 && (
                                <Typography sx={{ color: '#b8c5d6' }}>No posted badges yet.</Typography>
                            )}
                            {badges.map((badge, index) => (
                                <BadgeCard key={index} sx={{ marginBottom: 20 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="120"
                                            image={badge.image}
                                            alt="Posted badge"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ color: '#e2e8f0' }}>
                                                {badge.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#b8c5d6' }} dangerouslySetInnerHTML={{ __html: badge.description}}>

                                            </Typography>
                                            <a href={badge.link} className="card-link">
                                                <FontAwesomeIcon icon={faLink} className="mr-2" />
                                                {badge.link}
                                            </a>
                                        </CardContent>
                                    </CardActionArea>
                                </BadgeCard>
                            ))}
                        </Box>
                    </Container>
                </PageContainer>
            )

        }



        if (!this.props.auth.isAuthenticated) {
            return (
                <Navigate to="/" />
            );
        }


        //this.props.history.push("/")
    }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

Badge = connect(
    mapStateToProps, { updateAccount, saveUsernameAlbedo, pkeyGoogleUser, verifyCode, clearErrors }
)(Badge);

export default Badge = reduxForm({
    form: "ReduxForm",
    fields: ["name", "pkey"],
    clearErrors,
    //   generateCertificate,

})(withRouter(Badge));
