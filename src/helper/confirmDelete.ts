import Swal from 'sweetalert2';
import {Response} from "@/types/response";

interface ConfirmDeleteParams {
    t: (key: string) => string;
    id: string;
    itemName: string;
    deleteCallback: (id: string) => Promise<Response>;
    onSuccess?: () => void;
}

export const confirmDelete = async ({
                                        t,
                                        id,
                                        itemName,
                                        deleteCallback,
                                        onSuccess,
                                    }: ConfirmDeleteParams) => {
    const result = await Swal.fire({
        title: t("alert.confirm"),
        text: t("alert.text.delete"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("alert.button.yes.delete"),
        cancelButtonText: t("alert.button.cancel"),
    });

    if (result.isConfirmed) {
        const response = await deleteCallback(id);

        if (response.statusCode === 200) {
            Swal.fire(
                t("alert.deleted"),
                `${itemName}`,
                "success"
            );
            if (onSuccess) onSuccess();
        }
    }
};
