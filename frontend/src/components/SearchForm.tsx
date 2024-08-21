import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass as faMagnifyingGlassSolid } from '@fortawesome/free-solid-svg-icons';



const SearchForm: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    interface FormData {
        search: string;
    }

    const onSubmit = (data: FormData) => {
        navigate(`/search?query=${encodeURIComponent(data.search)}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group SearchGroup">
                <input type="text" className="form-control searchInput"
                    {...register('search')}
                    placeholder="Search movies . . ."
                />
                <button type="submit" className="btn"><FontAwesomeIcon icon={faMagnifyingGlassSolid} /></button>
            </div>

        </form>
    );
};

export default SearchForm;