export interface OffDayRequest {
    avatar: string;
    id: string;
    ad_soyad: string;
    izin_tarih: string;
    durum: string;
    onay: void;
    red: void;
}
export interface Column {
    id: 'avatar' | 'ad_soyad' | 'izin_tarih' | 'durum' | 'onay' | 'red';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
}
