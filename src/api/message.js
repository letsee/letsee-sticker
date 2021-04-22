import axios from 'axios';

// axios base setting
// 기본 URL 셋팅
// axios.defaults.baseURL = 'http://3.34.48.52:3000';
axios.defaults.baseURL = 'https://intra.letsee.io:10005/node';
// 헤더 공통 셋팅 필요할 경우
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
/**
 * 엔티티 메세지 등록
 * @param message
 * @returns {Promise<*>}
 */
module.exports.createEntityMessages = async (message) => {
    const config = {
        method: 'post',
        url: `/entityMessages`,
        data : message,
    };
    const { data } = await axios(config);
    console.log('data', data);
    return data;
};

module.exports.getEntityMessagesList = async () => {
    const config = {
        method: 'get',
        url: `/entityMessagesList`,
    };
    try {
        const { data } = await axios(config);
        return data;
    } catch (err) {
        console.log(err);
    }
};

/**
 * 엔티티 메세지 가져오기 pk
 * @param id
 * @returns {Promise<*>}
 */
module.exports.getEntityMessage = (id) => {
    const config = {
        method: 'get',
        url: `/entityMessages/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 엔티티 메세지 업데이트
 * @param id
 * @returns {Promise<*>}
 */
module.exports.updateEntityMessage = (id) => {
    const config = {
        method: 'put',
        url: `/entityMessages/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 엔티티 메세지 삭제
 * @param id
 * @returns {Promise<*>}
 */
module.exports.deleteEntityMessage = (id) => {
    const config = {
        method: 'delete',
        url: `/entityMessages/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 엔티티 메세지 갯수 가져오기
 * @returns {Promise<*>}
 */
module.exports.getEntityMessageCount = () => {
    const config = {
        method: 'get',
        url: `/getEntityMessageCount/`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 메세지 생성
 * @param message
 * @returns {Promise<*>}
 */
module.exports.createMessage = (message) => {
    const config = {
        method: 'post',
        url: `/messages/`,
        data: message,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 메세지 가져오기
 * @param id
 * @returns {Promise<*>}
 */
module.exports.getMessage = (id) => {
    const config = {
        method: 'get',
        url: `/messages/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 메세지 업데이트
 * @param id
 * @returns {Promise<*>}
 */
module.exports.updateMessage = (id) => {
    const config = {
        method: 'put',
        url: `/messages/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 메세지 삭제
 * @param id
 * @returns {Promise<*>}
 */
module.exports.deleteMessage = (id) => {
    const config = {
        method: 'delete',
        url: `/messages/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 메세지의 갯수 구하기
 * @returns {Promise<*>}
 */
module.exports.getMessagesCount = () => {
    const config = {
        method: 'get',
        url: `/getMessagesCount/`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};


/**
 * news 삭제
 * @param news
 * @returns {Promise<*>}
 */
module.exports.createNews = (news) => {
    const config = {
        method: 'post',
        url: `/news/`,
        data: news,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * news 취득 find by pk
 * @param id
 * @returns {Promise<*>}
 */
module.exports.getNews = (id) => {
    const config = {
        method: 'get',
        url: `/news/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 뉴스 갱신
 * @param id
 * @returns {Promise<*>}
 */
module.exports.updateNews = (id) => {
    const config = {
        method: 'put',
        url: `/news/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

/**
 * 뉴스 삭제
 * @param id
 * @returns {Promise<*>}
 */
module.exports.deleteNews = (id) => {
    const config = {
        method: 'delete',
        url: `/news/${id}`,
    };
    return axios(config).then(response => response).catch(errors => errors);
};

