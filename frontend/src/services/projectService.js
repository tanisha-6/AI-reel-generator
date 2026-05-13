// import axiosInstance from '../api/axios';


// export const getProjects = async () => {

//     const response = await axiosInstance.get(
//         'projects/'
//     );

//     return response.data;
// };

// services/projectService.js
import axiosInstance from '../api/axios';

export const getProjects = async () => {
  const response = await axiosInstance.get('projects/');
  return response.data;
};

export const saveProject = async (projectData) => {
  // projectData should include id, collectionId, name, topic, niche, platform, content_style, versions, etc.
  // If project already exists (has id), send PUT request; otherwise POST.
  if (projectData.id) {
    const response = await axiosInstance.put(`projects/${projectData.id}/`, projectData);
    return response.data;
  } else {
    const response = await axiosInstance.post('projects/', projectData);
    return response.data;
  }
};