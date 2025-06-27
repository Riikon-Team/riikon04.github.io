import React, { useEffect, useState } from 'react';
import { useRiikonData } from '../contexts/RiikonDataContext';
import './TeamMembers.css';

function ActivityDisplay({ activity }) {
  const [elapsed, setElapsed] = useState('');
  
  useEffect(() => {
    if (!activity.timestamps?.start) return;
    
    const updateElapsed = () => {
      const startTime = new Date(activity.timestamps.start);
      const endTime = activity.timestamps.end ? new Date(activity.timestamps.end) : new Date();
      
      const elapsedMs = endTime - startTime;
      
      const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
      const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);
      
      let formattedTime = '';
      if (hours > 0) {
        formattedTime = `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes > 0) {
        formattedTime = `${minutes}m ${seconds}s`;
      } else {
        formattedTime = `${seconds}s`;
      }
      
      setElapsed(formattedTime);
    };
    
    updateElapsed();
    const intervalId = setInterval(updateElapsed, 1000);
    
    return () => clearInterval(intervalId);
  }, [activity.timestamps]);
  
  const getActivityType = (type) => {
    const types = {
      0: 'Playing',
      1: 'Streaming',
      2: 'Listening to',
      3: 'Watching',
      4: 'Custom',
      5: 'Competing in'
    };
    return types[type] || 'Using';
  };
  
  return (
    <div className="user-activity">
      <div className="activity-header">
        <div className="activity-type">{getActivityType(activity.type)}</div>
        <div className="activity-name">{activity.name}</div>
      </div>
      
      {activity.details && (
        <div className="activity-details">{activity.details}</div>
      )}
      
      {activity.state && (
        <div className="activity-state">{activity.state}</div>
      )}
      
      {activity.timestamps && (
        <div className="activity-duration">
          {activity.timestamps.end ? 'Duration: ' : 'Elapsed: '}{elapsed}
        </div>
      )}
      
      {(activity.smallImageURL || activity.largeImageURL) && (
        <div className="activity-images">
          {activity.smallImageURL && (
            <img src={activity.smallImageURL} alt="" className="activity-small-image" />
          )}
          {activity.largeImageURL && (
            <img src={activity.largeImageURL} alt="" className="activity-large-image" />
          )}
          
        </div>
      )}
    </div>
  );
}

function TeamMembers() {
  const { 
    teamLeads, 
    teamLeadsLoading, 
    teamLeadsError, 
    fetchTeamLeads,
    users,
    usersLoading,
    usersError,
    fetchUsers
  } = useRiikonData();

  useEffect(() => {
    fetchTeamLeads();
    fetchUsers();
  }, [fetchTeamLeads, fetchUsers]);

  if (teamLeadsLoading || usersLoading) {
    return <div className="team-members loading">Loading team members...</div>;
  }

  if (teamLeadsError || usersError) {
    return <div className="team-members error">Failed to load team members.</div>;
  }

  const teamLeadIds = teamLeads.map(lead => lead.id);
  const regularMembers = users.filter(user => !teamLeadIds.includes(user.id));

  const renderMemberCard = (member, role) => (
    <div key={member.id} className={`team-member-card ${role === 'Team Lead' ? 'leader-card' : 'member-card'}`}>
      <div className="avatar-container">
        <img 
          src={member.avatar || "https://via.placeholder.com/150"} 
          alt={member.displayName || member.username} 
          className="team-member-avatar" 
        />
        {member.avatarDecorationURL && (
          <img 
            src={member.avatarDecorationURL} 
            alt="Avatar decoration" 
            className="avatar-decoration" 
          />
        )}
      </div>
      <div className={`status-dot ${member.presence?.status || 'offline'}`}></div>
      
      <div className="member-details">
        <div className="member-header">
          <h3 className="team-member-name">{member.displayName || member.username}</h3>
          <span className="member-tag">@{member.tag || member.username}</span>
        </div>
        
        <p className="team-member-role">{role}</p>
        
        <div className="member-presence">
          <div className="member-status">
            <span className={`status-indicator ${member.presence?.status || 'offline'}`}></span>
            <span className="status-text">
              {member.presence?.status 
                ? member.presence.status.charAt(0).toUpperCase() + member.presence.status.slice(1) 
                : 'Offline'}
            </span>
          </div>
          
          {member.presence?.activities && member.presence.activities.length > 0 && (
            <div className="member-activities">
              {member.presence.activities.map((activity, index) => (
                <ActivityDisplay key={index} activity={activity} />
              ))}
            </div>
          )}
        </div>
        
        <div className="member-info">
          <div className="member-joined">
            <i className="bi bi-calendar3"></i> Joined {new Date(member.joinedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="team-members">
      <div className="team-section">
        <h3 className="section-title">Team Leaders</h3>
        <div className="team-members-grid leaders-grid">
          {teamLeads.map(member => renderMemberCard(member, 'Team Lead'))}
        </div>
      </div>
      
      <div className="team-section">
        <h3 className="section-title">Team Members</h3>
        <div className="team-members-grid members-grid">
          {regularMembers.map(member => renderMemberCard(member, 'Member'))}
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;
