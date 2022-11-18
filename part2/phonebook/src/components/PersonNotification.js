const PersonNotification = ({ message }) => {
  if (message == null) {
    return null;
  }

  const className = message.isError ? 'notification error' : 'notification success';

  return(<div className={className}>{message.displayText}</div>);
};

export default PersonNotification;
