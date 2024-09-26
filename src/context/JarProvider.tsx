import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

type Jar = Record<string, number>;

const StoreJarContext = createContext<Jar | undefined>(undefined);
const DispatchJarContext = createContext<Dispatch<SetStateAction<Jar>> | undefined>(undefined);

export const useStoreJarContext = () => {
  const context = useContext(StoreJarContext);
  if (!context) {
    throw new Error('useStoreJarContext must be used within a JarContextProvider');
  }
  return context;
};

export const useDispatchJarContext = () => {
  const context = useContext(DispatchJarContext);
  if (!context) {
    throw new Error('useDispatchJarContext must be used within a JarContextProvider');
  }
  return context;
}

function JarProvider({ children }: PropsWithChildren) {
  const [jar, setJar] = useState<Jar>({});

  return (
    <DispatchJarContext.Provider value={setJar}>
      <StoreJarContext.Provider value={jar}>
        {children}
      </StoreJarContext.Provider>
    </DispatchJarContext.Provider>
  );
}

export default JarProvider;