import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AcceptAnnonce = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `https://finalprojectcar-production-aab1.up.railway.app/api/admin/selectAllByIdVoiture?id_voiture=${id}`;
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      const fetchData = async () => {
        try {
          const voitureAnnonceData = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem("id")}`
            }
          });

          const voiture = await voitureAnnonceData.json();
          if (voiture != null && voiture.length > 0) {
            const acceptUrl = `https://finalprojectcar-production-aab1.up.railway.app/api/admin/insertAcceptAnnonce?id_user=${voiture[0].idUtilisateur}&id_voiture=${voiture[0].idVoiture}`;
            
            // console.log("Before insertion:", new Date());

            try {
              const resultat = await fetch(acceptUrl, {
                method: 'POST',
                body: JSON.stringify({ id_admin: sessionStorage.getItem("id") }),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${sessionStorage.getItem("id")}`
                }
              });
              console.log(resultat);
                // Redirection après l'insertion réussie
                navigate("/admin");
            } catch (error) {
              console.error("Error accepting annonce:", error);
              

              // Ajoutez cette ligne pour imprimer la réponse du serveur en cas d'erreur JSON
              console.log("Server response:", await error.text());
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
      // Mise à jour de la référence après la première exécution
      hasFetchedData.current = true;
    }
  }, [url, navigate]);

  return null;
};
export default AcceptAnnonce;
