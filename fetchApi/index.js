import axios from 'axios';

export async function fetchApi({ method, endPoint, params, data, token, multipart }) {
    const headers = {
        'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
        // 'accessToken': token,
        'Authorization': token,
    };

    const config = {
        method,
        url: `${process.env.NEXT_PUBLIC_BASEURL}/${endPoint}`,
        headers,
        params,
        data: data ? data : {},
    };

    try {
        const response = await axios(config);
        return [response.data, null];
    } catch (error) {
        // console.log('error: ', error);
        return [null, error];
    }
}
