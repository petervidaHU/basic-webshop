# Webáruház alap
Bérelhető webáruház rendszer, amely később a megrendelő igényeire szabhat, mint az opencart, woocommerce stb.

## Könyvtárak

**Backend** - Rest API-ra épülő backend Node.js környezetben
**Frontend** - React.js alapú UI
**Docs** - A backend API-k dokumentációi

## A backend
A célom az volt, hogy létrehozzak alapvető funkciókkal rendelkező backendet, amely később tovább bővíthető. Megvalósult elemek és felhasznált technológiák:

**MVC modell** - routers, controllers, services rétegek használata.
**Jogok és szerepkörök** - bizonyos funkciók adminjogokhoz vannak kötve.
**Képfeltöltés** - a *sharp* könyvtárral megvalósított képfeltöltés egyben a képek optimalizálását, rgb és webp konvertálását is elvégzi.
**Adatbázis** - A MongoDB Atlas használatával az adatbázis skálázható és bárhonnan elérhető.

## A frontend

### Design
Egyéni stílus kialakítása helyett egy későbbi egyedi design, téma kialakítását elősegítő környezet kialakítása volt a cél. Az ehhez felhasznált technológiák:

**Styled-components** - CSS-in-JS megoldás, így globális css helyett komponens alapú stílusozás érhető el.
**Styled-system** - A styled-components-sel együttműködő theme-építő rendszer, amely egyben a reszponzivitásért is felel, és az alapvető theme fájlt biztosítja.
**Rebass** - a styled-system rendszerét használó primitív építőelemek könyvtára.
### Adatfolyam
Az applikáció adatait, azok változását egy központi rendszerben kezelem:
**Redux** - a React.js népszerű társa global state-k kezelésére.
**Thunk** - a Redux asszinkron folyamatait kezeli.

## A webáruház bemutatása
### Vásárlás
A megvásárolható termékek kategóriákba vannak sorolva. A kosárba tétel után a szállítási cím és a fizetési mód megadása után megtörténik a rendelés. A felhasználó a saját profilja alatt megtekintheti korábbi rendeléseit.
### Admin 
A főoldalon, ha admin jogú felhasználó van bejelentkezve, az /admin oldalon elérhető a kezelői felület. Itt érhető el a felhasználók, termékek, kategóriák, rendelések listája, amelyek több módosítási lehetőséget is rejtenek. Új admin jogú felhasználót is csak itt lehet regisztrálni.

## Applikáció inditása

- A Backend könyvtárban terminálból a `yarn start` paranccsal indul, 
alapbeállításban a 3001-es porton. A backend dockerizálva van, így opcionálisan dockerből is futtatható.
- A Frontend könyvtárban terminálból a `yarn start` paranccsal indul, alapbeállításban a 3000-es porton.  A frontend dockerizálva van, így opcionálisan dockerből is futtatható.
- A dokumentácó könyvtárban terminálból a `yarn start` paranccsal indul, alapbeállításban a 4000-es porton.
### Adatbázis
A MongoDB Atlas eléréséhez az .env fájlban meg kell adni a **MONGO_USER** adatait, `MONGO_USER=név:jelszó` formában
### Frontend környezeti változók
Az alapbeállítások szerint a következő .env fájl beállításokkal indul a frontend:

    REACT_APP_BACKEND_HOST='localhost'
    REACT_APP_BACKEND_PORT=3001
    REACT_APP_BACKEND='http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/'
    REACT_APP_PIC='http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/public/'
