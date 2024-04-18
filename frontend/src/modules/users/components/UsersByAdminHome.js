// MIT License

// Copyright (c) 2018 Martin Beierling

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, { useEffect, useRef, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as selectors from '../selectors';
import { useParams } from 'react-router-dom';
import { Errors } from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CanvasDraw from "react-canvas-draw";
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import perfil2 from './perfil1.jpeg'; //1920x1200


const UsersByAdminHome = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
	const [rowSelectionModelUser, setRowSelectionModelUser] = React.useState([]);
    const [userId , setUserId ] = useState(null);
	const [showTable, setShowTable] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail]  = useState("");
    const [userName, setUserName] = useState("");

    const [backendErrors, setBackendErrors] = useState("");
    const [emailError, setEmailError] = useState("");

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const users = useSelector(selectors.getAllUser);

    if(!users) {
        dispatch(actions.findUsersByAdminId( () => history(`/users/admin`)));
        return "Loading...";
    }


	const columnsUsers = [
		{ field: 'id', headerName: 'ID', width: 70, headerClassName: 'firstname-header' },
		{ field: 'firstName', headerName: <FormattedMessage id="project.global.fields.firstName"/>, width: 240, headerClassName: 'firstname-header'},
        { field: 'role', headerName: <FormattedMessage id="project.global.fields.role" />, width: 160, headerClassName: 'firstname-header',
        renderCell: (params) => (
            <div style={{ backgroundColor: 
                params.row.role === 'COACH' ? '#0f9b0f' : // Azul oscuro
                params.row.role === 'USER' ? '#ac6a06' : // Verde esmeralda
                'green', // Por defecto
                borderRadius: '20px',
            }}>
            {params.value}
            </div>
        ), },
		{ field: 'lastName', headerName: <FormattedMessage id="project.global.fields.lastName"/>, width: 400, headerClassName: 'firstname-header' },
		{ field: 'userName', headerName: <FormattedMessage id="project.global.fields.userName1"/>, width: 370 , headerClassName: 'firstname-header'},
        { field: 'email', headerName: <FormattedMessage id="project.players.fields.email"/>, width: 400, headerClassName: 'firstname-header' },
	];

	const rowsUsers = [
	];

    if (users) {
		users.map(user => {
			rowsUsers.push({
				id: user.id,
                role: user.role,
				firstName: user.firstName,
				lastName: user.lastName,
                email: user.email,
                userName: user.userName,
			});
		})
	}

    const handleSubmit = event => {

        event.preventDefault();
        dispatch(actions.removeUserByCoach(userId,
            () => errors => setBackendErrors(errors)
        ));
        window.location.reload('true')
    }



    const handleConfirmPassword = (e) => {
        const { value } = e.target;
        setConfirmNewPassword(value);
        setPasswordError(newPassword !== value);
    };



    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    
        // Expresión regular para validar el formato de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Verifica si el email cumple con el patrón
        setEmailError(!emailPattern.test(inputEmail));
      };

      const handleUsersByAdmin = (dispatch) => {
        dispatch(actions.findUsersByAdminId( () => history(`/users/admin`)));
    }
    const handleUsersByAdminCreate = (tabValue, dispatch) => {
        history(`/users/admin/${tabValue}`);
    }
    
    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
            }}
        >
<Box
    sx={{
        bgcolor: 'background.dark',
        boxShadow: 1,
        borderRadius: 4,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '80px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>

<Box sx={{boxShadow:"0 10px 50px rgb(0, 0, 0)" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(180deg,#0c1345,#91171b 30%,#91171b 30%,#91171b ,#0c1345)",
                            bgcolor:"red",
                            boxShadow: 6,
                            borderRadius: 3,
                            borderColor: "black",
							boxShadow: "0 10px 50px rgb(0, 0, 0)",
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                              },
                        }}
        >
          <Tab sx={{ color: '#f5af19', fontSize: "30px", padding:"20px"}} onClick={() => handleUsersByAdmin(dispatch)} label={<FormattedMessage id="project.global.list.users"/>}  />
          <Tab sx={{ color: '#f5af19', fontSize: "30px", padding:"20px" }} onClick={() => handleUsersByAdminCreate(1, dispatch)} label={<FormattedMessage id="project.global.create.users"/>}/>
        </Tabs>
      </Box>
</Box>














        <Box
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            width={"80vw"} // El ancho inicial es del 80% del ancho de la ventana
            height={"80vh"} // El alto inicial es del 80% del alto de la ventana
            p={5}
            ml={0}
            overflowX="auto" // Agrega desplazamiento horizontal si es necesario
            maxWidth={"1900px"}
            maxHeight={"1040px"}
            sx={{
                border: '2px solid grey',
                background: "linear-gradient(180deg,#df252c,#0c1345 10%,#0c1345 80%,#0c1345 ,#df252c)",
                background: "linear-gradient(180deg,#0c1345,#91171b 10%,#91171b 80%,#91171b ,#0c1345)",
                borderRadius: "20px",
                flexWrap: 'wrap',
                flexDirection: 'column',
                borderColor: "black",
                boxShadow: "0 10px 50px rgb(0, 0, 0)",
                overflowX:"scroll",
            }}
        >
            <Grid container columns={{ xs: 12, sm: 12, md: 12 }} style={{ height: '100%' }}>
            <Grid item md={12} xs={12} style={{ height: '100%' }}>
							<DataGrid
								sx={{
                                    background: "linear-gradient(180deg,#0c1345,#91171b 10%,#91171b 80%,#91171b ,#0c1345)",
									boxShadow: 12,
                                    color:"white",
                                    borderColor:"black",
                                    boxShadow:"0 10px 50px rgb(0, 0, 0)",
                                    fontSize:"30px",
                                    borderRadius: "20px",
                                    paddingBottom:"13.2px",
                                    overflowX:"scroll",
								}}
								rows={rowsUsers}
								columns={columnsUsers}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 16 },
									},
								}}
								pageSizeOptions={[8, 16]}
								checkboxSelection
								rowSelectionModel={rowSelectionModelUser}
								onRowSelectionModelChange={(newRowSelectionModelTeam) => {
									if (newRowSelectionModelTeam.length <= 1) {
										setRowSelectionModelUser(newRowSelectionModelTeam);
										console.log(" 111111: ", newRowSelectionModelTeam)
										setUserId((prevTeamId) => {
											console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelTeam);
											return newRowSelectionModelTeam;
										});
									} else {
										setRowSelectionModelUser(newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1]);
										console.log(" 22222: ", newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1])
										setUserId((prevTeamId) => {
											console.log(" seasonnnn SEGIMDPOPPPPP: ", newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1]);
											return newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1];
										});
									}

								}}
							/>

</Grid>

<Box display="flex" justifyContent="center" width="100%">
                    <button
                        className="button_remove_red"
                        onClick={(e) => handleSubmit(e)}
                    >
                        REMOVE
                    </button>
                </Box>

                               













            </Grid>
        </Box>
        </Box>

    );

}

export default UsersByAdminHome;