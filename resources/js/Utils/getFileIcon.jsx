import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';

// Helper function to determine the icon based on the file extension
const getFileIcon = (filePath) => {
    if (filePath.endsWith('.pdf')) {
        return <PictureAsPdfIcon />;
    } else if (filePath.match(/\.(jpeg|jpg|gif|png)$/)) {
        return <ImageIcon />;
    } else if (filePath.match(/\.(csv|xlsx|xls)$/)) {
        return <DescriptionIcon />;
    } else if (filePath.endsWith('none')) {
        return ''
    } else {
        return <DescriptionIcon />; // Fallback icon
    }
};

export default getFileIcon