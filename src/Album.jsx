// AlbumManagement.jsx

import React, { useState, useEffect } from 'react';
import './Album.css'; // Import the CSS file

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [updatedAlbumId, setUpdatedAlbumId] = useState(null);

  useEffect(() => {
    // Fetch albums from the API
    fetch('https://jsonplaceholder.typicode.com/albums?_limit=10')
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  const handleAddAlbum = () => {
    // Dummy POST request to add a new album
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newAlbumTitle,
        userId: 1, // Dummy user ID
      }),
    })
      .then(response => response.json())
      .then(data => setAlbums([...albums, data]))
      .catch(error => console.error('Error adding album:', error));
  };

  const handleUpdateAlbum = () => {
    // Dummy PUT request to update an album
    if (updatedAlbumId !== null) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${updatedAlbumId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Updated Album Title',
        }),
      })
        .then(response => response.json())
        .then(data => {
          const updatedAlbums = albums.map(album =>
            album.id === updatedAlbumId ? data : album
          );
          setAlbums(updatedAlbums);
          setUpdatedAlbumId(null);
        })
        .catch(error => console.error('Error updating album:', error));
    }
  };

  const handleDeleteAlbum = (albumId) => {
    // Dummy DELETE request to delete an album
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: 'DELETE',
    })
      .then(() => setAlbums(albums.filter(album => album.id !== albumId)))
      .catch(error => console.error('Error deleting album:', error));
  };

  return (
    <div className="container">
      <h1 className='heading'>Album Management App</h1>

      <h2>Albums</h2>
      <div className="album-list">
        {albums.map(album => (
          <div key={album.id} className="album-card">
            <p className="album-title">{album.title}</p>
            <div className="album-actions">
              <button onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h2>Add New Album</h2>
      <div>
        <input
          type="text"
          placeholder="Album Title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
        />
        <button onClick={handleAddAlbum}>Add Album</button>
      </div>

      <h2>Update Album</h2>
      <div>
        <input
          type="number"
          placeholder="Album ID to Update"
          value={updatedAlbumId}
          onChange={(e) => setUpdatedAlbumId(Number(e.target.value))}
        />
        <button onClick={handleUpdateAlbum}>Update Album</button>
      </div>
    </div>
  );
};

export default Album;
