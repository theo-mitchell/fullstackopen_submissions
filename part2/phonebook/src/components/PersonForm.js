const PersonForm = ({onSubmit, name, onNameChange, phone, onPhoneChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name:
          <input type="text" value={name} onChange={onNameChange} />
        </div>
        <div>
          phone number:
          <input
            type="tel"
            value={phone}
            onChange={onPhoneChange}
            placeholder="123-4566789"
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
