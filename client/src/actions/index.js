
export const getInitialData = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => response.json())
            .then(events => {
                console.log(events);
                dispatch(getInitialDataReceived(events))
            })
            .catch(error => console.error(error))
    }
};

export const GET_DATA_RECEIVED = 'GET_DATA_RECEIVED';
export const getInitialDataReceived = (data) => {
    return {
        type: GET_DATA_RECEIVED,
        payload: data
    }
};