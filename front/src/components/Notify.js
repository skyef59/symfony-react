import * as React from 'react';
import ReactDOM from "react-dom/client";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Notify = (message, severity = 'info') => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);

    const close = () => {
        root.unmount();
        document.body.removeChild(container);
    };

    root.render(<Snackbar
        anchorOrigin={{ vertical: 'bottom',  horizontal: 'center' }}
        open={true}
        onClose={close}
    >
        <Alert severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>);
};

export default Notify;