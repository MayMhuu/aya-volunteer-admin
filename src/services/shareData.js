import local  from './local';
import api  from './api';

import { store } from 'react-notifications-component';
import Swal from 'sweetalert2';


let shareData = {};

shareData.objUser = local.get('user');
shareData.selectMultiStyle= {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
    };
  }
}

//#react-select
  shareData.customStyles= {
    control: (base, styles) => ({
      ...base,
      height: 34,
      minHeight: 34
    }),
    menu: provided => ({ ...provided, zIndex: 9999 }),
    option: (base, state) => ({
      ...base,
      zIndex:99999,
      backgroundColor: state.isSelected ? "#fff" : "#fff",
      borderBottom:"1px solid #eee",
      cursor:"pointer",
      color:"#333",
      ':active': {
        backgroundColor: state.isSelected ? "#fff" : "#fff"
      },
      ':hover': {
        backgroundColor: "#ccc"
      }
    })
  }
//Endreact-select

  shareData.objNotification = {
    title: "Require Field!",
    message: "...",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: false,
      showIcon: true
    }
  }

  shareData.showNotification = async (title, message, type) => {
    let noti = shareData.objNotification;
    noti ={ ...shareData.objNotification, 
            title: title, 
            message: message, 
            type: type,
          };
    await store.addNotification(noti);
  }

  shareData.showCopied = async () => {
    let noti = shareData.objNotification;
    noti ={ ...shareData.objNotification, 
            title: "", 
            message: "Copied  to clipboard!", 
            type: "success",
          };
    await store.addNotification(noti);
  }

  shareData.checkRequireFields = (requireFields) => {
    let requiredCount =0;
    let promises = requireFields.map(obj => {
      let objNoti = shareData.objNotification;
      let condition = obj.type ==='string' ? !obj.field : !obj.field.id;
      if(condition){
        objNoti ={ ...shareData.objNotification, message: obj.name +" is required."};
        store.addNotification(objNoti);
        requiredCount++;
      }
    });
    return requiredCount;
  }

  shareData.handleUploadImage = async (file) => {
    let dataParams ={isUpload: true, file: file};
    let result = await api.uploadImage(dataParams);
    return result;
  }


  shareData.checkPassword = async (value) => {
    let flag = false;
    let phoneRegex = new RegExp(`^[0-9]{6}$`);
    if(!phoneRegex.test(value)){
      await shareData.showNotification("Error", "Invalid Password Format.", "warning");
    }else{
      flag = true;
    }
    return flag;
  }

  shareData.checkPhone = async (value) => {
    let flag = false;
    let phoneRegex = new RegExp(`^(09)([0-9]{7,9})$`);
    if(!phoneRegex.test(value)){
      await shareData.showNotification("Error", "Invalid Phone Format.", "warning");
    }else{
      flag = true;
    }
    return flag;
  }

  shareData.convertArrayOfObjectsToCSV = async (array) => {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }


  shareData.downloadCSV = (array) => {
    const link = document.createElement('a');
    let csv = shareData.convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  shareData.confirmBox = async (content) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: content,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if(result.value){
        return true;
      }else{
        return false;
      }
    });
  }

  shareData.downloadBox = async (content) => {
    return Swal.fire({
      position: 'top-end',
      title: '<b>Export Success</b>',
      html: "<br><br>"+ content.name + "<br><br><button class='swal2-confirm swal2-styled'> <a target='_blank' href='"+content.link+"'>Download</a><button>",
      showConfirmButton: false,
      showOkButton: false,
      // showCancelButton: true,
      showCloseButton: true,
      customClass: {
        cancelButton: 'btn btn-danger'
      },
      cancelButtonText: 'Close'
    });

  }

  shareData.convertArrayOfObjectsToCSV = (array, keys) => {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    // const keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  shareData.downloadCSV = (array, keyData) => {
    const link = document.createElement('a');
    let csv = shareData.convertArrayOfObjectsToCSV(array, keyData);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }


export default shareData;

