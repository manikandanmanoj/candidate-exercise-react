class SecureStorage {
    key: string;
    constructor(key: string) {
        this.key = key;
    }
    setValue = (value: any) => {
        localStorage.setItem(this.key, value);
    };
    getValue = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.key);
        }
    };
    clear = () => {
        localStorage.removeItem(this.key);
    };
}

export const StorageService = {
    auth: new SecureStorage('auth'),
};
