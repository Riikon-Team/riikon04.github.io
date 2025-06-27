import { createContext, useState, useContext, useEffect, useCallback } from 'react';

const API_BASE_URL = 'https://riikon04-web-server.onrender.com/api';

const ROLE_ADMIN_ID = '994270954526097448'
// Create context
const DiscordContext = createContext();

export const useDiscord = () => useContext(DiscordContext);

export const DiscordProvider = ({ children }) => {
  // Server data state
  const [serverInfo, setServerInfo] = useState(null);
  const [serverLoading, setServerLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  // Users data state
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  
  // Team leads state (users with roleId=ROLE_ADMIN_ID)
  const [teamLeads, setTeamLeads] = useState([]);
  const [teamLeadsLoading, setTeamLeadsLoading] = useState(false);
  const [teamLeadsError, setTeamLeadsError] = useState(null);

  // Projects data state
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null);
  
  // Function to fetch server information
  const fetchServerInfo = useCallback(async () => {
    try {
      setServerLoading(true);
      setServerError(null);
      
      const response = await fetch(`${API_BASE_URL}/discord/server`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch server info: ${response.status}`);
      }
      
      const data = await response.json();
      setServerInfo(data);
    } catch (error) {
      console.error('Error fetching server info:', error);
      setServerError(error.message);
    } finally {
      setServerLoading(false);
    }
  }, []);

  // Function to fetch users with optional roleId filter
  const fetchUsers = useCallback(async (roleId = null) => {
    try {
      if (roleId) {
        setTeamLeadsLoading(true);
        setTeamLeadsError(null);
      } else {
        setUsersLoading(true);
        setUsersError(null);
      }
      
      const url = roleId 
        ? `${API_BASE_URL}/discord/users?roleId=${roleId}` 
        : `${API_BASE_URL}/discord/users`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (roleId) {
        setTeamLeads(data.users || []);
      } else {
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if (roleId) {
        setTeamLeadsError(error.message);
      } else {
        setUsersError(error.message);
      }
    } finally {
      if (roleId) {
        setTeamLeadsLoading(false);
      } else {
        setUsersLoading(false);
      }
    }
  }, []);

  // Function to fetch team leads (users with roleId=ROLE_ADMIN_ID)
  const fetchTeamLeads = useCallback(() => {
    return fetchUsers(ROLE_ADMIN_ID);
  }, [fetchUsers]);

  // Function to fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      setProjectsLoading(true);
      setProjectsError(null);
      
      const response = await fetch(`${API_BASE_URL}/projects`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }
      
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjectsError(error.message);
    } finally {
      setProjectsLoading(false);
    }
  }, []);

  // Fetch server info on mount
  useEffect(() => {
    fetchServerInfo();
  }, [fetchServerInfo]);

  // Context value
  const value = {
    // Server info
    serverInfo,
    serverLoading,
    serverError,
    refreshServerInfo: fetchServerInfo,
    
    // Users
    users,
    usersLoading,
    usersError,
    fetchUsers,
    
    // Team leads
    teamLeads,
    teamLeadsLoading,
    teamLeadsError,
    fetchTeamLeads,
    
    // Projects
    projects,
    projectsLoading,
    projectsError,
    fetchProjects
  };

  return (
    <DiscordContext.Provider value={value}>
      {children}
    </DiscordContext.Provider>
  );
};
