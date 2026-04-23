import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const VersionControl = () => {
  const location = useLocation();
  const history = useHistory();
  const [isLore, setIsLore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if the path contains /lore/ or ends with /lore
    setIsLore(location.pathname.includes('/lore/') || location.pathname.endsWith('/lore'));
  }, [location.pathname]);

  const toggleVersion = () => {
    let newPath;
    if (isLore) {
      newPath = location.pathname.replace('/lore/', '/docs/').replace(/\/lore$/, '/docs');
    } else {
      newPath = location.pathname.replace('/docs/', '/lore/').replace(/\/docs$/, '/lore');
    }
    
    // If the replacement didn't happen (e.g. at root), force a destination
    if (newPath === location.pathname) {
      newPath = isLore ? '/vr-documentation/docs/intro' : '/vr-documentation/lore/intro';
    }
    
    history.push(newPath);
  };

  const modalContent = (
    <div 
      className={`${styles.modalOverlay} ${showModal ? styles.active : ''}`}
      onClick={() => setShowModal(false)}
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={() => setShowModal(false)}>&times;</button>
        <img 
          src={useBaseUrl('/img/lore-map.png')} 
          alt="Guild Lore Map" 
          className={styles.modalImage}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.toggleWrapper} onClick={toggleVersion}>
        <div className={`${styles.toggleBg} ${isLore ? styles.lore : ''}`} />
        <div className={`${styles.option} ${!isLore ? styles.active : ''}`}>Normal</div>
        <div className={`${styles.option} ${isLore ? styles.active : ''}`}>Lore</div>
      </div>

      <button 
        className={styles.mapButton} 
        onClick={() => setShowModal(true)}
        title="View Lore Image"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </button>

      {mounted && showModal && createPortal(modalContent, document.body)}
    </div>
  );
};

export default VersionControl;
