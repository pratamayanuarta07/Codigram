import axios from 'axios';

export const GET_ITEM = "GET_ITEM";
export const GET_SELF = "GET_SELF";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const LOGIN = "LOGIN";
export const REFRESH = "REFRESH";
export const ADD_POST = "ADDPOST";
export const GET_POSTING = "GET_POSTING";
export const UPDATE_POSTING = "UPDATE_POSTING";
export const GET_POSTING1 = "GET_POSTING1";
export const UPDATE_POSTING1 = "UPDATE_POSTING1";
export const GET_ONE = "GET_ONE";
export const PICK_ONE = "PICK_ONE";
export const UPDATE_USR = "UPDATE_USR";

export const getSelf = (id) =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: GET_SELF,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "GET",
            url: "http://localhost:3400/self/"+id,
                         })
            .then((response) => {
                //console.log('3. Berhasil Dapet Data : ', response.data.data);
                dispatch({
                    type: GET_SELF,
                    payload: {
                        loading: false,
                        data:response.data.data,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                //console.log('3. Gagal', err.message);
                dispatch({
                    type: GET_SELF,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}


export const pickOne = (id) =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: PICK_ONE,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "GET",
            url: "http://localhost:3400/testing2/"+id,
                         })
            .then((response) => {
                //console.log('3. Berhasil Dapet Data : ', response.data.data[0]);
                dispatch({
                    type: PICK_ONE,
                    payload: {
                        loading: false,
                        data:response.data.data[0],
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                console.log('3. Gagal', err.message);
                dispatch({
                    type: PICK_ONE,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}



export const getItem = () =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: GET_ITEM,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "GET",
            url: "http://localhost:3400/testing",
                         })
            .then((response) => {
                //console.log('3. Berhasil Dapet Data : ', response);
                dispatch({
                    type: GET_ITEM,
                    payload: {
                        loading: false,
                        data:response.data,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                //console.log('3. Gagal', err.message);
                dispatch({
                    type: GET_ITEM,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}



export const addItem = (data1) =>{
    return (dispatch) => {
        console.log('2. Masuk Action');
        dispatch({
            type: ADD_ITEM,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "POST",
            url: "http://localhost:3400/user",
            data:data1,
            headers:{'Content-Type': 'multipart/form-data'}
             })
            .then((response) => {
                console.log('3. Berhasil Dapet Data : ', response.data);
                //sessionStorage.setItem('msg', response.data.status);
                dispatch({
                    type: ADD_ITEM,
                    payload: {
                        loading: false,
                        data:response.data,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                console.log('3. Gagal', err.message);
                dispatch({
                    type: ADD_ITEM,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}


export const deleteItem = (id, image) =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: DELETE_ITEM,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "DELETE",
            url: `http://localhost:3400/delete/${id}/${image}`,
                         })
            .then((response) => {
                console.log('3. Berhasil Dapet Data : ', response.data);
                dispatch({
                    type: DELETE_ITEM,
                    payload: {
                        loading: false,
                        data:response.data,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                console.log('3. Gagal', err.message);
                dispatch({
                    type: DELETE_ITEM,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}


export const login = (data1) =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: LOGIN,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "POST",
            url: "http://localhost:3400/login",
            data:data1
             })
            .then((response) => {
                dispatch({
                    type: LOGIN,
                    payload: {
                        loading: false,
                        data:response.data,
                        errorMessage: false
                    }
                });
                // sessionStorage.setItem('item', {msg:response.data.status,
                // id:response.data.data.id, role:response.data.data.role, token:response.data.data.token});
                // sessionStorage.setItem('msg', response.data.status);
                // sessionStorage.setItem('id', response.data.data.id);
                // sessionStorage.setItem('role', response.data.data.role);
                // sessionStorage.setItem('token', response.data.data.token);
            })
            .catch((err) => {
                console.log('3. Gagal', err.message);
                dispatch({
                    type: LOGIN,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}

export const refresh = (data1) =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: REFRESH,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "GET",
            url: "http://localhost:3400/test",
            data:data1
             })
            .then((response) => {
                //console.log('31. Berhasil Dapet Data : ', response.data);
                sessionStorage.setItem('msg', response.data.status);
                dispatch({
                    type: REFRESH,
                    payload: {
                        loading: false,
                        data:response.data,
                        errorMessage: false
                    }
                });
                sessionStorage.setItem('msg', response.data.status);
            })
            .catch((err) => {
                console.log('3. Gagal', err.message);
                dispatch({
                    type: REFRESH,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}


export const addPost = (data1, auth) =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: ADD_POST,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "POST",
            url: "http://localhost:3400/posting",
            data:data1,
            headers:{'Content-Type': 'multipart/form-data'}
             })
            .then((response) => {
                console.log('3. Berhasil Dapet Data : ', response.data);
                sessionStorage.setItem('msg', response.data.status);
                dispatch({
                    type: ADD_POST,
                    payload: {
                        loading: false,
                        data:response.data,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                console.log('3. Gagal', err.message);
                dispatch({
                    type: ADD_POST,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}


export const getOne = (data1, auth) =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: GET_ONE,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "GET",
            url: "http://localhost:3400/search/"+data1,
            //headers:{'Content-Type': 'multipart/form-data'}
             })
            .then((response) => {
                console.log('3. Berhasil Dapet Data : ', response.data);
                //sessionStorage.setItem('msg', response.data.status);
                dispatch({
                    type: GET_ONE,
                    payload: {
                        loading: false,
                        data:response.data,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                console.log('3. Gagal', err.message);
                dispatch({
                    type: GET_ONE,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}



export const getPosting = (id, auth) =>{
    return (dispatch) => {
        //console.log('2. Masuk Action');
        dispatch({
            type: GET_POSTING,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "GET",
            url: "http://localhost:3400/user/"+id,
            headers:{Authorization:auth}
                         })
            .then((response) => {
                //console.log('3. Berhasil Dapet Data : ', response);
                //console.log('4. Berhasil Dapet Data : ', response.data.data[0]);
                dispatch({
                    type: GET_POSTING,
                    payload: {
                        loading: false,
                        data:response.data.data,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                //console.log('3. Gagal', err.message);
                dispatch({
                    type: GET_POSTING,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}


export const updatePosting = (id, data1, auth) =>{
    return (dispatch) => {
        console.log('2. Masuk Action');
        dispatch({
            type: UPDATE_POSTING,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "PATCH",
            url: "http://localhost:3400/posting/"+id,
            data:data1,
            headers:{'Content-Type': 'multipart/form-data'}
                         })
            .then((response) => {
                console.log('3. Berhasil Dapet Data : ', response);
                //console.log('4. Berhasil Dapet Data : ', response.data.data[0]);
                dispatch({
                    type: UPDATE_POSTING,
                    payload: {
                        loading: false,
                        data:response,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                //console.log('3. Gagal', err.message);
                dispatch({
                    type: UPDATE_POSTING,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}


export const updateuser = (id, data1, auth) =>{
    return (dispatch) => {
        console.log('2. Masuk Action');
        dispatch({
            type: UPDATE_USR,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });
        console.log(data1.get('email'));
        axios({
            method: "PATCH",
            url: "http://localhost:3400/updatebio/"+id,
            data:data1,
            headers:{'Content-Type': 'multipart/form-data'}
                         })
            .then((response) => {
                //console.log('3. Berhasil Dapet Data : ', response);
                //console.log('4. Berhasil Dapet Data : ', response.data.data[0]);
                dispatch({
                    type: UPDATE_USR,
                    payload: {
                        loading: false,
                        data:response,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                //console.log('3. Gagal', err.message);
                dispatch({
                    type: UPDATE_USR,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}


export const getPosting1 = (auth, id) =>{
    return (dispatch) => {
        console.log(id);
        dispatch({
            type: GET_POSTING1,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "GET",
            url: "http://localhost:3400/posting2/"+id,
            headers:{Authorization:auth},
        })
            .then((response) => {
                //console.log('3. Berhasil Dapet Data : ', response);
                //console.log('4. Berhasil Dapet Data : ', response.data.data[0]);
                dispatch({
                    type: GET_POSTING1,
                    payload: {
                        loading: false,
                        data:response.data.data,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                //console.log('3. Gagal', err.message);
                dispatch({
                    type: GET_POSTING1,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}

export const updatePosting1 = (id, data1, auth) =>{
    return (dispatch) => {
        console.log('2. Masuk Action');
        dispatch({
            type: UPDATE_POSTING,
            payload: {
                loading: true,
                data:false,
                errorMessage: false
            }
        });

        axios({
            method: "PATCH",
            url: "http://localhost:3400/posting2/"+id,
            data:data1,
            headers:{Authorization:auth}
                         })
            .then((response) => {
                console.log('3. Berhasil Dapet Data : ', response);
                //console.log('4. Berhasil Dapet Data : ', response.data.data[0]);
                dispatch({
                    type: UPDATE_POSTING,
                    payload: {
                        loading: false,
                        data:response,
                        errorMessage: false
                    }
                });
            })
            .catch((err) => {
                //console.log('3. Gagal', err.message);
                dispatch({
                    type: UPDATE_POSTING,
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: err.message
                    }
                });
            });
    }
}
