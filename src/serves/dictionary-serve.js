import http from "../http-common";

class DictionaryDataService {

    getWord(word) {

        return http.get();
    }
    getAll() {
        return http.get("/words");
    }

    get(id) {
        return http.get(`/words/${id}`);
    }

    findByWord(word) {
        return http.get(`/words/search/${word}`);
    }

    addWord(data) {
        return http.post("/words", data);
    }
}

export default new DictionaryDataService();