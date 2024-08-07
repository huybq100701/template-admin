import Swal from 'sweetalert2';

const toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
});

export const success = (title: string) => {
    toast.fire({
        icon: 'success',
        title,
    });
};

export const error = (title: string) => {
    toast.fire({
        icon: 'error',
        title,
    });
};
