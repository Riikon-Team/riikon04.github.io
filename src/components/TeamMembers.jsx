import React, { useEffect } from 'react';
import { useRiikonData } from '../contexts/RiikonDataContext';
import './TeamMembers.css'; // Add CSS import

function TeamMembers() {
  const { 
    teamLeads, 
    teamLeadsLoading, 
    teamLeadsError, 
    fetchTeamLeads 
  } = useRiikonData();

  useEffect(() => {
    fetchTeamLeads();
  }, [fetchTeamLeads]);

  if (teamLeadsLoading) {
    return <div className="team-members loading">Loading team members...</div>;
  }

  if (teamLeadsError) {
    return <div className="team-members error">Failed to load team members.</div>;
  }

  return (
    <div className="team-members">
      <div className="team-members-grid">
        {teamLeads.map(member => (
          <div key={member.id} className="team-member-card">
            <div className="avatar-container">
              <img 
                src={member.avatar || "https://via.placeholder.com/150"} 
                alt={member.displayName || member.username} 
                className="team-member-avatar" 
              />
              
            </div>
            <div className={`status-dot ${member.presence?.status || 'offline'}`}></div>
            
            <div className="member-details">
              <h3 className="team-member-name">{member.displayName || member.username}</h3>
              <p className="team-member-role">Team Lead</p>
              <p className="team-member-bio">
                {member.presence?.activities?.[0]?.name 
                  ? `Currently using ${member.presence.activities[0].name}` 
                  : "Team member since " + new Date(member.joinedAt).toLocaleDateString()}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamMembers;
