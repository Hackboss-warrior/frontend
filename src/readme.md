1º Lógica para que se entere de que cambio el Token

const [Token, setMiLocalStorage] = useState(localStorage.getItem('Token') || '');
  const navigate = useNavigate();

  const handleLocalStorageChange = (e) => {
    setMiLocalStorage(e.newValue);
    fetchUserData();
    navigate('/');
  };

  useEffect(() => {
    window.addEventListener('storage', handleLocalStorageChange);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []); 
