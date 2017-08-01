import './contactInfo--AuthReg.scss';
//---------------------------------------------------------------

let ContactInfo = () => {

  return (
      <div className="contactInfo">

        <p className="contactInfo__paragraph">
          <i className="fa fa-home contactInfo__icon"/>
          г. Одесса ул. Балковская 120/1
        </p>

        <p className="contactInfo__paragraph">
          <i className="fa fa-phone contactInfo__icon"/>
          +38 (095) 064-33-81
        </p>

        <p className="contactInfo__paragraph">
          <i className="fa fa-phone contactInfo__icon"/>
          +38 (048) 770-24-87
        </p>

        <p className="contactInfo__paragraph">
          <i className="fa fa-envelope contactInfo__icon"/>
          sales@aser.com.ua
        </p>

      </div>
  );

};
//--------------------------------------------------------------------

export default ContactInfo;