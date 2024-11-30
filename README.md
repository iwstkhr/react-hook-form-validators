# react-hook-form-validators
You can consolidate your validation rules in a single file or location.

## Usage
### Download
```shell
curl https://raw.githubusercontent.com/iwstkhr/react-hook-form-validators/main/validators.ts --output path/to/your/project/validators.ts
```

### Component with React Hook Form
Select validators you want to use and pass them to `composeValidators`.

```tsx
import { useForm } from 'react-hook-form';
import { composeValidators, emailValidator, requiredValidator } from './validators';

export const HelloWorldPage: React.FC = () => {
  const { register, formState: { errors } } = useForm({ mode: 'all' });
  return (
    <form>
      <input type="text" { ...register('email', composeValidators(requiredValidator, emailValidator)) } />
      <p>
        <>{ errors.email?.message }</>
      </p>
    </form>
  );
};
```
