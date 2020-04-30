import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const useFetch = url => {

    const isCurrent = useRef(true);
    const [state, setState] = useState({ data: [], loading: true});

    useEffect(() => {
        return () => isCurrent.current = false;
    },[]);

    useEffect(() => {
        setState({ data: state.data, loading: true});
        axios.get(url)
            .then( result => {
                if(isCurrent.current) {
                    const {data} = result;
                    setState({ data, loading: false })
                }
            }).catch( err => {
                setState({ 
                    data: {
                        errorStatus: err.response.status,
                        errorMsg: err.response.data.message
                    },
                    loading: false
                });
            });
    }, [url, setState]);

    return state.data
};