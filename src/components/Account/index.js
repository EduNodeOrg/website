import React, { Component } from 'react'
import { connect } from "react-redux";
import withRouter from '../../withRouter';
import { reduxForm } from "redux-form";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types'
import axios from 'axios';
import { Navigate } from "react-router-dom";
import styled from 'styled-components';
import Navbar1 from '../Dashboard/Navbar1';
import ImageUploading from "react-images-uploading";
import Autocomplete from '@mui/material/Autocomplete';


const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const SelectedTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const SelectedTag = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  background-color: #f5f5f5;
  color: #333;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const RemoveTagButton = styled.button`
  background-color: transparent;
  color: #333;
  border: none;
  font-size: 0.9rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;
const tagsList = [

  "Web3",
  "Blockchain",
  "Crypto",
  "Smart Contracts",
  "NFTs",
  "Soroban",
  "Solidity",
  "IT",
  "Dev",
  "E-learning",
  "Programming",
  "Javascript",
  "Nodejs",
  "Reactjs",
  "Other",
];

const skillsList = [
  "IT",
  "Programming",
  "Javascript",
  "Nodejs",
  "Reactjs",
  "TypeScript",
  "Other",
];



class Account extends Component {

  constructor(props) {
    super(props);
    const { auth } = this.props;

    this.state = {
      tags: auth.user && auth.user.preferences ? auth.user.preferences : [],
      skills: auth.user && auth.user.skills ? auth.user.skills : [],
      name: auth.user && auth.user.name ? auth.user.name : "",
      email: auth.user.email ? auth.user.email : '',
      preferences: auth.user && auth.user.preferences ? auth.user.preferences : [],
      age: auth.user && auth.user.age ? auth.user.age : "",
      bio: auth.user && auth.user.bio ? auth.user.bio : "",
      bio: auth.user && auth.user.university ? auth.user.university : "",
      location: auth.user && auth.user.location ? auth.user.location : "",
      _id: auth.user && auth.user._id ? auth.user._id : "",
      isLoading: false,
      errors: {},
      isUpdated: false,
      user: {},
      file: '',
      imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
      images: [],
      maxNumber: 1,
      value: '',
      selectedUniversity: null,
      universityOptions: [],
      showSpecifyField: false,
      showSpecify: false,
    };
    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleTagRemove = this.handleTagRemove.bind(this);
    this.handleSkillsSelect = this.handleSkillsSelect.bind(this);
    this.handleSkillsRemove = this.handleSkillsRemove.bind(this);

    // this.handleLocationChange = this.handleLocationChange.bind(this);
  }



  handleUniversityChange = (event, value) => {
    this.setState({ selectedUniversity: value });
  };

  handleTagSelect(e) {

    const selectedTag = e.target.value;
    if (selectedTag === "Other") {
      this.setState({ showSpecifyField: true });
    } else if (!this.state.tags.includes(selectedTag)) {
      this.setState({ tags: [...this.state.tags, selectedTag] });
    }
  }

  handleSkillsSelect(e) {
    const selectedTag = e.target.value;
    if (selectedTag === "Other") {
      this.setState({ showSpecify: true });
    } else if (!this.state.skills.includes(selectedTag)) {
      this.setState({ skills: [...this.state.skills, selectedTag] });
    }
  }

  handleTagRemove(removedTag) {
    this.setState({
      tags: this.state.tags.filter((tag) => tag !== removedTag),

    });
  }

  handleSkillsRemove(removedTag) {
    this.setState({
      skills: this.state.skills.filter((tag) => tag !== removedTag),

    });
  }

  componentDidMount() {
    const { email } = this.state;

    axios.get(`https://edunode.herokuapp.com/api/emaillogin/user/${email}`)
      .then(response => {
        const data = response.data;
        this.setState({ user: data }, () => {
        });
      })
      .catch(error => {
        console.error(error);
      });
    // Fetch the university names from the backend API
   {/**  fetch('http://localhost:5001/api/universities/universities')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ universityOptions: data });
      })
      .catch((error) => {
        console.error('Error:', error);
      });*/}

  }




  handleNameChange = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        name: event.target.value
      }
    }));
  };
  handleUniversityChange = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        university: event.target.value
      }
    }));
  };

  handleAgeChange = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        age: event.target.value
      }
    }));
  };

  handleBioChange = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        bio: event.target.value
      }
    }));
  };
  handlePreferencesChange = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        preferences: event.target.value
      }
    }));
  };
  handleSkillsChange = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        skills: event.target.value
      }
    }));
  };

  // handleLocationChange = (event, newValue) => {
  //   this.setState({ location: newValue ? newValue.label : null  });
  //   console.log(newValue);
  // };


  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    clearErrors: PropTypes.func
  }

  renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )


  onSubmit = async values => {

    const imageStrings = this.state.images.map(image => image.data_url); // Extract the image data URLs from the state
    const imagesJoin = imageStrings.join(','); // Convert the image data URLs to a single comma-separated string

    const images = imagesJoin || this.state.user.images;

    const preferences = this.state.preferences;
    const skills = this.state.skills;
    const { tags, email, specify ,specify2 } = this.state;
    const formData = {
      name: this.state.user.name,
      university: this.state.user.university,
      age: this.state.user.age,
      bio: this.state.user.bio,
      _id: this.props.auth.user._id,
      email: this.props.auth.user.email,
      location: this.state.user.location,
      images: images
    };
    try {

      axios.post('https://edunode.herokuapp.com/api/profile', formData)
        .then(response => {
          console.log(response.data);
          this.setState({ isUpdated: true }); // set isUpdated to true if account is successfully updated
        })
        .catch(error => {
          console.error(error);
        });
      axios.post('https://edunode.herokuapp.com/api/users/preferences', { preferences: [...tags, ...(specify ? [specify] : [])], email: email })
        .then(response => {
          console.log(response.data); // Log the response from the backend
        })
        .catch(error => {
          console.error(error); // Log any errors that occur
        });

      axios.post('https://edunode.herokuapp.com/api/users/skills', { skills: [...skills, ...(specify2 ? [specify2] : [])], email: email })
        .then(response => {
          console.log(response.data); // Log the response from the backend
        })
        .catch(error => {
          console.error(error); // Log any errors that occur
        });

    } catch (error) {
      console.log(error);
    }
    // create user object


  }


  // handle form submission
  onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    this.setState({ images: imageList });
    console.log('image', this.state.images)
  };
  handleSpecifyChange = (event) => {
    this.setState({ specify: event.target.value });
  };
  handleSpecifyChange2 = (event) => {
    this.setState({ specify2: event.target.value });
  };




  render() {
    const { value, selectedUniversity, universityOptions } = this.state;
    const { isAuthenticated } = this.props.auth
    const { imagePreviewUrl,
      name,
      status,
      active } = this.state;
    if (!isAuthenticated) {
      return (
        <Navigate to="/" />
      );
    }
    const { tags, skills, user, images, maxNumber } = this.state;
    const { isUpdated } = this.state; // get isUpdated from state
    const email = this.props.auth.user.email ? this.props.auth.user.email : '';


    let specifyField = null;
  if (this.state.showSpecifyField) {
    specifyField = (
      <div>
        <label>Please specify preferences:</label>
        <TextField
          name="specify"
          type="text"
          placeholder="Please specify"
          fullWidth
          value={this.state.specify}
          onChange={this.handleSpecifyChange}
        />
      </div>
    );
  }

  let specify = null;
  if (this.state.showSpecify) {
    specify = (
      <div>
        <label>Please specify skills:</label>
        <TextField
          name="specify"
          type="text"
          placeholder="Please specify"
          fullWidth
          value={this.state.specify2}
          onChange={this.handleSpecifyChange2}
        />
      </div>
    );
  }

    return (
      <>

        <div>
          <div style={{ z: -1 }} >
            <Navbar1 />

          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={4} md={3}>
            <Sidebar props={email} />
          </Grid> */}
              <Grid item xs={12} sm={8} md={9}>

                <div style={{ padding: '10px' }}>
                  <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <h4 style={{ fontSize: "2em", textAlign: "center" }}>Account</h4>
                    <br></br>
                    <>
                      <div>
                        {/* Other account information */}
                        <h4>Profile Picture :</h4>

                        <div
                          style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'inline-block',
                          }}
                        >

                          <img
                            src={this.state.user.images}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />

                        </div>
                      </div>

                      <p>Please upload only png and jpg</p>
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={this.onChangeImage}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        acceptType={["jpg", 'png']}
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper">
                            <button
                              style={{
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                padding: "5px 10px",
                                fontSize: "1.2em",
                                boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",

                              }}

                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Click or Drop here
                            </button>
                            &nbsp;

                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                  <button
                                    style={{
                                      backgroundColor: "#007bff",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: "4px",
                                      padding: "5px 10px",
                                      fontSize: "1.2em",
                                      boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)"
                                    }}
                                    onClick={() => onImageUpdate(index)}>Update</button>
                                  <button
                                    style={{
                                      backgroundColor: "#007bff",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: "4px",
                                      padding: "5px 10px",
                                      fontSize: "1.2em",
                                      boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)"
                                    }}
                                    onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ImageUploading>



                      <br></br>
                      <label>Full Name:</label>
                      <TextField

                        name="name"
                        type="text"
                        placeholder="Name"
                        fullWidth
                        value={this.state.user.name}
                        onChange={this.handleNameChange}
                      />
                      <label>Email:</label>
                      <TextField
                        disabled
                        name="email"
                        type="email"
                        placeholder={this.props.auth.user.pkey || this.props.auth.user.email}
                        fullWidth
                        inputRef={(input) => (this.emailInput = input)}
                      />
                      <label>Age:</label>
                      <TextField
                        name="age"
                        type="number"
                        placeholder="Age"
                        fullWidth
                        value={user.age}
                        onChange={this.handleAgeChange}
                      />
                      <label>Bio:</label>
                      <TextField
                        name="bio"
                        multiline
                        rows={4}
                        placeholder="My Web3 Journey"
                        fullWidth
                        value={user.bio}
                        onChange={this.handleBioChange}
                      />
                      <label>University:</label>
                      <TextField
                        name="university"
                        type="text"
                        placeholder="university"
                        fullWidth
                        value={user.university}
                        onChange={this.handleUniversityChange}
                      />



                     {/**  <Autocomplete
                        id="combo-box-demo"
                        options={universityOptions}
                        fullWidth
                        value={selectedUniversity || ''}
                        onChange={this.handleUniversityChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Choose University" variant="outlined" fullWidth />
                        )}
                      />*/}





                      <label>Preferences:</label>

                      <Select fullWidth id="tags" onChange={this.handleTagSelect} style={{ width: '100%' }}>

                        <option value="">
                          {Array.isArray(user.preferences) && user.preferences.join(' , ')}
                        </option>

                        {tagsList.map((tag) => (
                          <option key={tag} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </Select>

                      <SelectedTagsContainer>
                        {tags.map((tag) => (
                          <SelectedTag key={tag}>
                            {tag}
                            <RemoveTagButton onClick={() => this.handleTagRemove(tag)}>
                              X
                            </RemoveTagButton>
                          </SelectedTag>
                        ))}
                      </SelectedTagsContainer>

                      {specifyField}
                            
                      <label>Skills:</label>

                      <Select fullWidth id="tags" onChange={this.handleSkillsSelect} style={{ width: '100%' }}>
                        <option value="">
                          {Array.isArray(user.skills) && user.skills.join(' , ')}
                        </option>
                        {skillsList.map((tag) => (
                          <option key={tag} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </Select>
                      <SelectedTagsContainer>
                        {skills.map((tag) => (
                          <SelectedTag key={tag}>
                            {tag}
                            <RemoveTagButton onClick={() => this.handleSkillsRemove(tag)}>
                              X
                            </RemoveTagButton>
                          </SelectedTag>
                        ))}
                      </SelectedTagsContainer>

                      {specify}
                    </>
                    <br></br>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "10px 20px",
                        fontSize: "1.2em",
                        boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      Submit
                    </button>


                  </form>
                  <br></br>
                  {isUpdated && (
                    <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: "4px", }}>
                      Account updated successfully!
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>

          </Box>
        </div>
      </>
    )
  }
}

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan, Republic of China',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];

const mapStateToProps = (state) => ({
  auth: state.auth
});

Account = connect(
  mapStateToProps,
)(Account);

export default Account = reduxForm({
  form: "ReduxForm",
  fields: ["name", "email", "age", "location", "bio"],
})(withRouter(Account));