export const timeAgoTracker = (lastSeen) => {
  if (lastSeen) {
    const now = new Date();
    const then = new Date(lastSeen);
    const seconds = Math.floor((now - then) / 1000);

    let interval = Math.floor(seconds / 31536000); // years
    // if (interval > 0) return `${interval} year${interval > 1 ? 's' : ''} ago`;
    if (interval > 0) return `${interval}y ago`;

    interval = Math.floor(seconds / 2592000); // months
    // if (interval > 0) return `${interval} month${interval > 1 ? 's' : ''} ago`;
    if (interval > 0) return `${interval}m ago`;

    interval = Math.floor(seconds / 86400); // days
    // if (interval > 0) return `${interval} day${interval > 1 ? 's' : ''} ago`;
    if (interval > 0) return `${interval}d ago`;

    interval = Math.floor(seconds / 3600); // hours
    // if (interval > 0) return `${interval} hour${interval > 1 ? 's' : ''} ago`;
    if (interval > 0) return `${interval}h ago`;

    interval = Math.floor(seconds / 60); // minutes
    // if (interval >= 1) return `${interval} min${interval > 1 ? 's' : ''} ago`;
    if (interval >= 1) return `${interval} min ago`;

    return "1 min ago";
  }
};
