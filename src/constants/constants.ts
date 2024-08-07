export const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';
export const LOCAL_STORAGE_CLIENT_ID = 'clientId';
export const LOCAL_STORAGE_USER = 'user';
export const DEFAULT_PAGE = 1;
export const PAGE_SIZE_GET_ALL = 100000;

export interface IFilterCommon {
    page: number;
    size: number;
}
export interface IFilter extends IFilterCommon {
}

export const DEFAULT_FILTER = {
    page: 1,
    size: 10,
};

export const STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
};

export const STATUS_OPTIONS = [
    { label: 'Kích hoạt', value: 'ACTIVE' },
    { label: 'Hủy', value: 'INACTIVE' },
];

export const MODAL_TYPE = {
    ADD: 'add',
    VIEW: 'view',
    EDIT: 'edit',
  };
