import React from "react";
import "./Supcrtbl.scss";

export default function Supcrtbl() {
  return (
    <div className="p-5 mx-5">
      <h2 className="supcrtblHeader">
        Introduction to SUPCRTBL(sᴜᴘᴄʀᴛ - Bloomington)
      </h2>
      <div>
        <ul className="supcrtlb-links">
          {[
            { name: "Online Version Of Supcrtbl", url: "/" },
            { name: "Download sᴜᴘᴄʀᴛʙʟ For Windows", url: "/" },
            { name: "Download sᴜᴘᴄʀᴛʙʟ For Linux", url: "/" },
            { name: "Download Tutorial For sᴜᴘᴄʀᴛʙʟ", url: "/" },
            { name: "View Changelog of sᴜᴘᴄʀᴛʙʟ", url: "/" },
          ].map((elemnt) => (
            <li>
              <a className="supcrtlb-links__item" href={elemnt.url}>
                {elemnt.name}
              </a>
            </li>
          ))}
        </ul>

        <p>
          sᴜᴘᴄʀᴛ is a software package to calculate thermodynamic properties for
          minerals, gases, aqueous species, and reactions at high temperatures
          and pressures. It is a FORTRAN program written originally by students
          and associates of Professor H.C. Helgeson at the University of
          California - Berkeley, and was updated by Jim W. Johnson, Eric H
          Oelkers and Everett Shock up to 1992 (Johnson et al., 1992). The
          original program uses the internally consistent database of minerals
          and gases from Helgeson et al. (1978). The Maier-Kelley heat capacity
          formulation was used for minerals.
        </p>
        <p>
          For this version of sᴜᴘᴄʀᴛ (sᴜᴘᴄʀᴛʙʟ), we used a more recent mineral
          database of Holland and Powell (2011) and modified the computer code
          accordingly to accommodate the different heat capacity function,
          volume as a function of temperature and pressure, and mineral phase
          transition using the Landau model (Holland and Powell, 1998). We also
          added more species to the database. This includes arsenic minerals and
          aqueous species, aluminum species from Tagirov and Schott (2001),
          aqueous silica from Apps and Spycher (2004) and Stefasson (2001), and
          dawsonite from Benezeth et al. (2007). The stated temperature and
          pressure ranges for aqueous species are from 1 to 5000 bars and 0° to
          1000°C, but for minerals the ranges exceed the original limits stated
          in Johnson et al. (1992), but vary for individual species. Please
          check carefully.
        </p>
        <p>
          Please refer the following article when you use of the sᴜᴘᴄʀᴛʙʟ code
          and accompanying database:
        </p>
        <p className="references">
          Zimmer, K., Zhang, Y.L., Lu, P., Chen, Y.Y., Zhang, G.R., Dalkilic, M.
          and Zhu, C. (2016) SUPCRTBL: A revised and extended thermodynamic
          dataset and software package of SUPCRT92.{" "}
          <em>Computer and Geosciences</em> 90:97-111.
          <a
            className="supcrtlb-links__item m-2"
            href="https://www.sciencedirect.com/science/article/pii/S0098300416300371?via%3Dihub"
          >
            DOI
          </a>
        </p>
        <p>
          We strongly recommend citing together with Johnson et al. (1992) when
          using sᴜᴘᴄʀᴛʙʟ:
        </p>
        <p className="references">
          Johnson, J.W., Oelkers, E.H. and Helgeson, H.C. (1992) SUPCRT92 - A
          software package for calculating the standard molal thermodynamic
          properties of minerals, gases, aqueous species, and reactions from
          1-bar to 5000-bar and 0°C to 1000°C. Computer and Geosciences
          18:899-947.
        </p>

        <p>
          The computer code and database presented here was put together to
          accommodate the needs of our departmental colleagues and students in
          petrological research, and was a collective effort by many of Zhu’s
          students over several years: Peng Lu (now at Saudi Aramco), Yanyan
          Chen (now at Petro China), Guanru Zhang (now a professor at Chengdu
          Univ. of Technology), Kurt Zimmer (now a Data Science Manager at
          Wayfair), Yilun Zhang (now a senior scientist at InterTek
          environmental services), and Kevin Tu (undergrad in IU School of
          Informatics, Computing, and Engineering). Many parts are untested, and
          the users assume all responsibilities. We will continue making
          corrections. Kindly send comments and corrections to Chen Zhu at
          <a
            className="supcrtlb-links__item m-2"
            href="mailto:supcrt@indiana.edu"
          >
            supcrt@indiana.edu.
          </a>
        </p>
        <br />
        <p>
          There is no Mac version of sᴜᴘᴄʀᴛ due to issues compiling Fortran to
          the many different versions of OSX, please use the online version
          instead.
        </p>
        <br />
        <p>
          This material was partly supported by NSF grant EAR-1926734, the
          endowment for the Haydn Murray Chair, and the Office of the Vice
          Provost for Research of Indiana University.
        </p>
      </div>

      <div className="mt-5">
        <h2 className="font-weight-bold">DISCLAMER</h2>
        <p>
          This material was prepared, in part, sponsored by an agency of the
          United States Government or Indiana University. Neither the United
          States Government, nor Indiana University, makes any warranty, express
          or implied, or assumes any legal liability or responsibility for the
          accuracy, completeness, or usefulness of any information, apparatus,
          product, or process disclosed, or represents that its use would not
          infringe privately owned rights.
        </p>
        <p className="supcrtlb-links__item m-2">
          sᴜᴘᴄʀᴛʙʟ is provided under this Creative Commons closed source license
        </p>
      </div>
    </div>
  );
}
