import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { cash, onlinepayment } from '../Apis/payment';
import useMutationCart from '../Hooks/useMutationCart';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ cartid }) {
    let [flag, setflag] = React.useState(false)
    let { mutate, data } = useMutationCart(onlinepayment)
    let { mutate: mutateCash, data: dataCash } = useMutationCart(cash)

    function handleSubmit(shippingAddress) {//الباراميتر دا شايل القيم اللي حطتها فالفورم عشان بتتبعت تلقائي لما بعمل سابميت

        //mutate بتاخد مني باراميتر واحد فلو عاوزه ابعت كذا حاجه هبعتها فشكل اوبجكت
        if (flag)
            mutate({ cartid, shippingAddress })
        else
            mutateCash({ cartid, shippingAddress })
    }
    if (data?.data?.status === 'success') {
        window.location.href = data?.data?.session?.url
    }
    // console.log(dataCash)
    if (dataCash?.data?.status === 'success') {
        toast('All is done')
    }
    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },

        onSubmit: handleSubmit
    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={() => { handleOpen(); setflag(!flag) }} sx={{ m: '30px' }} variant='contained' color='success'  >Pay Online</Button>
            <Button onClick={handleOpen} sx={{ m: '30px' }} variant='contained' color='success'  >Pay Cash</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}


                    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                            <input type="text" onChange={formik.handleChange} value={formik.values.details} id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="details" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                            <input type="text" onChange={formik.handleChange} value={formik.values.city} id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                            <input type="tel" onChange={formik.handleChange} value={formik.values.phone} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
                        </div>
                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                    </form>


                </Box>
            </Modal>
        </div>
    );
}
