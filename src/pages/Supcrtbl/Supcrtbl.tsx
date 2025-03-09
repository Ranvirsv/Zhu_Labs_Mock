import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
} from "react-bootstrap";
import "../../App.scss";
import { ROUTES } from "../../constants/routes";

const links = [
  {
    name: "Online Version of Supcrtbl",
    url: ROUTES.SUPCRTBL_ONLINE_INPUT_FILE,
  },
];

/**
 * ### Supcrtbl ("Super-Crit-Table")
 * Disclaimer and information page for the online super crit application.
 *
 */
export default function Supcrtbl() {
  return (
    <div className="p-5 mx-5">
      <h2 className="supcrtblHeader">
        Introduction to SUPCRTBL(sᴜᴘᴄʀᴛ - Bloomington)
      </h2>
      <div>
        <ul className="App-links">
          {links.map((e) => (
            <li>
              <a className="App-links__item" href={e.url}>
                {e.name}
              </a>
            </li>
          ))}
        </ul>

        <p>
          sᴜᴘᴄʀᴛ is a software package to calculate thermodynamic properties for
          minerals, gases, aqueous species, and reactions at high temperatures
          and pressures. It is a FORTRAN program written originally by students
          and associates of Professor H.C. Helgeson at the University of
          California - Berkeley and was updated by Jim W. Johnson, Eric H
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
          added more species to the database. These include rare earth element
          minerals and solids (Pan, Zhu, and others, 2024), arsenic minerals and
          aqueous species, aluminum species from Tagirov and Schott (2001),
          aqueous silica from Apps and Spycher (2004) and Stefasson (2001), and
          dawsonite from Benezeth et al. (2007). The stated temperature and
          pressure ranges for aqueous species are from 1 to 5000 bars and 0° to
          1000°C; for minerals the ranges exceed the original limits stated in
          Johnson et al. (1992); but vary for individual species. Please check
          carefully.
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
            className="App-links__item m-2"
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
          The computer code and database presented here was put together by many
          of Zhu’s students over several years: Peng Lu (now at Saudi Aramco),
          Yanyan Chen (now at Petro China), Guanru Zhang (now a professor at
          Chengdu Univ. of Technology), Kurt Zimmer (now a Data Science Manager
          at Wayfair), Yilun Zhang (now a senior scientist at InterTek
          environmental services), and undergrads in the Luddy School of
          Informatics, Computing, and Engineering (Kevin Tu, Rob Hageboeck,
          Ranvir Virk Singh). Many parts are untested, and the users assume all
          responsibilities. We will continue making corrections. Kindly send
          comments and corrections to Chen Zhu at
          <a className="App-links__item m-2" href="mailto:supcrt@iu.edu">
            supcrt@iu.edu.
          </a>
        </p>
        <br />
        <p>
          There is no Mac version of sᴜᴘᴄʀᴛ due to issues compiling Fortran to
          the many different versions of OSX, please use the online version
          instead.
        </p>
      </div>

      <div className="mt-5">
        <h2 className="font-weight-bold">DISCLAIMER</h2>
        <p>
          This material was prepared, in part, sponsored by an agency of the
          United States Government or Indiana University. Neither the United
          States Government, nor Indiana University, makes any warranty, express
          or implied, or assumes any legal liability or responsibility for the
          accuracy, completeness, or usefulness of any information, apparatus,
          product, or process disclosed, or represents that its use would not
          infringe privately owned rights.
        </p>
        <p className="App-links__item m-2">
          sᴜᴘᴄʀᴛʙʟ is provided under this Creative Commons closed source license
        </p>
      </div>

      <Container className="py-4" style={{ backgroundColor: "#FFFFFF" }}>
        <Row className="my-4">
          <Col>
            <h2>List of changes in databases (Table 4)</h2>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-4">
            <ListGroup className="text-center">
              <ListGroupItem variant="dark">
                <Badge pill bg="dark" text="white">
                  SUPCRT96.dat
                </Badge>
              </ListGroupItem>
              <ListGroupItem variant="light">Aqueous Species</ListGroupItem>
              <ListGroupItem>
                Al-bearing species and NaOH from Pokrovskii and Helgeson (1995).
              </ListGroupItem>
              <ListGroupItem>
                Metal-organic complexes and other organic compounds from Haas{" "}
                <em>et al.</em> (1995); and references therein.
              </ListGroupItem>
              <ListGroupItem>
                Palladium from Sassani and Shock (1998).
              </ListGroupItem>
              <ListGroupItem>
                All other species from Sverjensky<em>et al.</em> (1997) and
                those internally consistent to Sverjensky <em>et al.</em> (1997)
                in earlier Helgeson and co-workers’ publications.
              </ListGroupItem>
              <ListGroupItem variant="light">Minerals</ListGroupItem>
              <ListGroupItem>
                Al oxyhydroxides from Pokrovskii and Helgeson (1995); all others
                from Helgeson <em>et al.</em> (1978).
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3} className="mb-4">
            <ListGroup className="text-center">
              <ListGroupItem variant="dark">
                <Badge pill bg="dark" text="white">
                  SLOP98.dat
                </Badge>
              </ListGroupItem>
              <ListGroupItem variant="light">Aqueous Species</ListGroupItem>
              <ListGroupItem>
                Al-bearing species, from Shock <em>et al.</em> (1997b).
              </ListGroupItem>
              <ListGroupItem>
                Metal-organic complexes and other organic compounds from Haas{" "}
                <em>et al.</em> (1995); and references therein.
              </ListGroupItem>
              <ListGroupItem>
                Uranium from Shock <em>et al.</em> (1997a); Platinum-Group from
                Sassani and Shock (1998).
              </ListGroupItem>
              <ListGroupItem>
                All other species from Sverjensky <em>et al.</em> (1997) and
                those internally consistent to Sverjensky <em>et al.</em> (1997)
                in earlier Helgeson and co-workers’ publications.
              </ListGroupItem>
              <ListGroupItem variant="light">Minerals</ListGroupItem>
              <ListGroupItem>
                Helgeson <em>et al.</em> (1978).
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3} className="mb-4">
            <ListGroup className="text-center">
              <ListGroupItem variant="dark">
                <Badge pill bg="dark" text="white">
                  SLOP07.dat
                </Badge>
              </ListGroupItem>
              <ListGroupItem variant="light">Aqueous Species</ListGroupItem>
              <ListGroupItem>
                Al-bearing species, from Shock <em>et al.</em> (1997b).
              </ListGroupItem>
              <ListGroupItem>
                Metal-organic complexes and other organic compounds from Shock
                (2009); and references therein.
              </ListGroupItem>
              <ListGroupItem>
                Uranium from Shock <em>et al.</em> (1997a); Platinum-Group from
                Sassani and Shock (1998); Actinides from Murphy and Shock
                (1999).
              </ListGroupItem>
              <ListGroupItem>
                All other species from Sverjensky <em>et al.</em> (1997) and
                those internally consistent to Sverjensky <em>et al.</em> (1997)
                in earlier Helgeson and co-workers’ publications.
              </ListGroupItem>
              <ListGroupItem variant="light">Minerals</ListGroupItem>
              <ListGroupItem>
                Helgeson <em>et al.</em> (1978).
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3} className="mb-4">
            <ListGroup className="text-center">
              <ListGroupItem variant="dark">
                <Badge pill bg="dark" text="white">
                  SUPCRTBL.dat
                </Badge>
              </ListGroupItem>
              <ListGroupItem variant="light">Aqueous Species</ListGroupItem>
              <ListGroupItem>
                Al-bearing species from Tagirov and Schott (2001).
              </ListGroupItem>
              <ListGroupItem>
                Metal-organic complexes and other organic compounds from Dale{" "}
                <em>et al.</em> (1997); and references therein.
              </ListGroupItem>
              <ListGroupItem>
                SiO<sub>2</sub> and HSiO<sub>3</sub>
                <sup>-</sup> from Apps and Spycher (2004), Stefansson (2001).
              </ListGroupItem>
              <ListGroupItem>
                As-bearing species from Nordstrom and Archer (2002)
                Metal-arsenate and metal-arsenite aqueous complexes from Marini
                and Accornero (2010).
              </ListGroupItem>
              <ListGroupItem>
                All other species from Sverjensky <em>et al.</em> (1997) and
                those internally consistent to Sverjensky <em>et al.</em> (1997)
                in earlier Helgeson and co-workers’ publications.
              </ListGroupItem>
              <ListGroupItem variant="light">Minerals</ListGroupItem>
              <ListGroupItem>
                Holland and Powell (2011); Boehmite from Hemingway{" "}
                <em>et al.</em> (1991); Gibbsite from Robie <em>et al.</em>{" "}
                (1978); Dawsonite from this study; Arsenopyrite from Ball and
                Nordstrom (1991); Scorodite and Ferric-As,am from Langmuir{" "}
                <em>et al.</em> (2006); Barium-As and Barium-H-As from Zhu{" "}
                <em>et al.</em> (2005); all other As-bearing solids from
                Nordstrom and Archer (2002).
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
