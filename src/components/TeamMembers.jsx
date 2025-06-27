import React, { useEffect } from 'react';
import { useDiscord } from '../contexts/DiscordContext';

function TeamMembers() {
  const { 
    teamLeads, 
    teamLeadsLoading, 
    teamLeadsError, 
    fetchTeamLeads 
  } = useDiscord();

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
            <img 
              src={member.avatar || "https://via.placeholder.com/150"} 
              alt={member.displayName || member.username} 
              className="team-member-image" 
            />
            <h3 className="team-member-name">{member.displayName || member.username}</h3>
            <p className="team-member-role">Team Lead</p>
            <p className="team-member-bio">
              {member.presence?.activities?.[0]?.name 
                ? `Currently using ${member.presence.activities[0].name}` 
                : "Team member since " + new Date(member.joinedAt).toLocaleDateString()}
            </p>
            <div className="member-status">
              <span className={`status-indicator ${member.presence?.status || 'offline'}`}></span>
              <span className="status-text">{member.presence?.status || 'offline'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamMembers;
